import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string;
}

export interface UserInfo {
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    email_verified?: boolean;
    phone_number?: string;
    preferred_username?: string;
    role?: string | string[];
}

export interface LoginRequest {
    username: string;
    password: string;
    rememberMe?: boolean;
}

// Helper to decode JWT token
function decodeJwt(token: string): any {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Failed to decode JWT:', e);
        return null;
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'access_token';
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';
    private readonly USER_KEY = 'user_info';
    private readonly TOKEN_EXPIRY_KEY = 'token_expiry';

    private userSubject = new BehaviorSubject<UserInfo | null>(null);
    public user$ = this.userSubject.asObservable();

    // Signals for reactive state
    public isAuthenticated = signal(false);
    public currentUser = signal<UserInfo | null>(null);
    public isLoading = signal(false);

    // Computed signals
    public userName = computed(() => {
        const user = this.currentUser();
        return user?.name || user?.preferred_username || user?.email || '';
    });

    public userRoles = computed(() => {
        const user = this.currentUser();
        let roles: string[] = [];

        // First try to get roles from user info
        if (user?.role) {
            roles = Array.isArray(user.role) ? user.role : [user.role];
        }

        // If no roles from userinfo, try to decode from JWT token
        if (roles.length === 0) {
            const token = this.getToken();
            if (token) {
                const decoded = decodeJwt(token);
                console.log('Decoded JWT:', decoded); // Debug logging
                // ABP uses 'role' claim in the JWT
                if (decoded?.role) {
                    roles = Array.isArray(decoded.role) ? decoded.role : [decoded.role];
                }
            }
        }

        // Normalize to lowercase for comparison
        return roles.map(r => r.toLowerCase());
    });

    public isAdmin = computed(() => {
        const roles = this.userRoles();
        console.log('User roles:', roles); // Debug logging
        // Check for admin role (case-insensitive since we normalized)
        return roles.includes('admin');
    });


    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.initializeAuthState();
    }

    private initializeAuthState(): void {
        const token = this.getToken();
        const userInfo = this.getStoredUserInfo();

        if (token && !this.isTokenExpired()) {
            this.isAuthenticated.set(true);
            if (userInfo) {
                this.currentUser.set(userInfo);
                this.userSubject.next(userInfo);
            } else {
                // Fetch user info if not stored
                this.fetchUserInfo().subscribe();
            }
        } else if (this.getRefreshToken()) {
            // Try to refresh token
            this.refreshToken().subscribe({
                error: () => this.logout()
            });
        }
    }

    login(credentials: LoginRequest): Observable<TokenResponse> {
        this.isLoading.set(true);

        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('username', credentials.username)
            .set('password', credentials.password)
            .set('client_id', environment.oAuthConfig.clientId)
            .set('scope', environment.oAuthConfig.scope);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.post<TokenResponse>(
            `${environment.oAuthConfig.issuer}/connect/token`,
            body.toString(),
            { headers }
        ).pipe(
            tap(response => {
                this.storeTokens(response);
                this.isAuthenticated.set(true);
            }),
            switchMap(() => this.fetchUserInfo()),
            map(() => ({} as TokenResponse)),
            catchError(error => {
                this.isLoading.set(false);
                return throwError(() => error);
            }),
            tap(() => this.isLoading.set(false))
        );
    }

    logout(): void {
        this.clearTokens();
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }

    refreshToken(): Observable<TokenResponse> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('No refresh token available'));
        }

        const body = new HttpParams()
            .set('grant_type', 'refresh_token')
            .set('refresh_token', refreshToken)
            .set('client_id', environment.oAuthConfig.clientId);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        return this.http.post<TokenResponse>(
            `${environment.oAuthConfig.issuer}/connect/token`,
            body.toString(),
            { headers }
        ).pipe(
            tap(response => {
                this.storeTokens(response);
                this.isAuthenticated.set(true);
            }),
            catchError(error => {
                this.logout();
                return throwError(() => error);
            })
        );
    }

    fetchUserInfo(): Observable<UserInfo> {
        return this.http.get<UserInfo>(
            `${environment.oAuthConfig.issuer}/connect/userinfo`
        ).pipe(
            tap(userInfo => {
                console.log('User info from ABP:', userInfo); // Debug logging
                this.storeUserInfo(userInfo);
                this.currentUser.set(userInfo);
                this.userSubject.next(userInfo);
            }),
            catchError(error => {
                console.error('Failed to fetch user info:', error);
                return of({} as UserInfo);
            })
        );
    }

    private storeTokens(response: TokenResponse): void {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
        if (response.refresh_token) {
            localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refresh_token);
        }

        // Calculate and store expiry time
        const expiryTime = Date.now() + (response.expires_in * 1000);
        localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
    }

    private storeUserInfo(userInfo: UserInfo): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(userInfo));
    }

    private getStoredUserInfo(): UserInfo | null {
        const stored = localStorage.getItem(this.USER_KEY);
        return stored ? JSON.parse(stored) : null;
    }

    private clearTokens(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    isTokenExpired(): boolean {
        const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
        if (!expiry) return true;
        return Date.now() > parseInt(expiry, 10);
    }

    hasRole(role: string): boolean {
        return this.userRoles().includes(role);
    }

    hasAnyRole(roles: string[]): boolean {
        return roles.some(role => this.hasRole(role));
    }
}

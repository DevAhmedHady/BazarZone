import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);

    // Skip auth for token endpoint
    if (req.url.includes('/connect/token')) {
        return next(req);
    }

    const token = authService.getToken();

    if (token) {
        req = addTokenHeader(req, token);
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401 && !isRefreshing) {
                isRefreshing = true;

                return authService.refreshToken().pipe(
                    switchMap(() => {
                        isRefreshing = false;
                        const newToken = authService.getToken();
                        return next(addTokenHeader(req, newToken!));
                    }),
                    catchError((refreshError) => {
                        isRefreshing = false;
                        authService.logout();
                        return throwError(() => refreshError);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};

function addTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
}

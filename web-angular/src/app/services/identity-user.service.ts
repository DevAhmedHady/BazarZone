import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ABP Common Types
export interface PagedResultDto<T> {
    totalCount: number;
    items: T[];
}

export interface ListResultDto<T> {
    items: T[];
}

// Identity User DTOs
export interface IdentityUserDto {
    id: string;
    tenantId?: string;
    userName: string;
    name?: string;
    surname?: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber?: string;
    phoneNumberConfirmed: boolean;
    isActive: boolean;
    lockoutEnabled: boolean;
    lockoutEnd?: string;
    concurrencyStamp?: string;
    creationTime: string;
    creatorId?: string;
    lastModificationTime?: string;
    lastModifierId?: string;
    isDeleted: boolean;
    deleterId?: string;
    deletionTime?: string;
    extraProperties?: Record<string, any>;
}

export interface IdentityUserCreateDto {
    userName: string;
    name?: string;
    surname?: string;
    email: string;
    phoneNumber?: string;
    isActive: boolean;
    lockoutEnabled: boolean;
    roleNames?: string[];
    password: string;
}

export interface IdentityUserUpdateDto {
    userName: string;
    name?: string;
    surname?: string;
    email: string;
    phoneNumber?: string;
    isActive: boolean;
    lockoutEnabled: boolean;
    roleNames?: string[];
    password?: string;
    concurrencyStamp?: string;
}

export interface GetIdentityUsersInput {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
}

export interface IdentityUserUpdateRolesDto {
    roleNames: string[];
}

@Injectable({
    providedIn: 'root'
})
export class IdentityUserService {
    private readonly baseUrl = `${environment.apiUrl}/api/identity/users`;

    constructor(private http: HttpClient) { }

    getList(input?: GetIdentityUsersInput): Observable<PagedResultDto<IdentityUserDto>> {
        let params = new HttpParams();

        if (input?.filter) {
            params = params.set('Filter', input.filter);
        }
        if (input?.sorting) {
            params = params.set('Sorting', input.sorting);
        }
        if (input?.skipCount !== undefined) {
            params = params.set('SkipCount', input.skipCount.toString());
        }
        if (input?.maxResultCount !== undefined) {
            params = params.set('MaxResultCount', input.maxResultCount.toString());
        }

        return this.http.get<PagedResultDto<IdentityUserDto>>(this.baseUrl, { params });
    }

    get(id: string): Observable<IdentityUserDto> {
        return this.http.get<IdentityUserDto>(`${this.baseUrl}/${id}`);
    }

    create(input: IdentityUserCreateDto): Observable<IdentityUserDto> {
        return this.http.post<IdentityUserDto>(this.baseUrl, input);
    }

    update(id: string, input: IdentityUserUpdateDto): Observable<IdentityUserDto> {
        return this.http.put<IdentityUserDto>(`${this.baseUrl}/${id}`, input);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getRoles(id: string): Observable<ListResultDto<{ id: string; name: string }>> {
        return this.http.get<ListResultDto<{ id: string; name: string }>>(`${this.baseUrl}/${id}/roles`);
    }

    updateRoles(id: string, input: IdentityUserUpdateRolesDto): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}/roles`, input);
    }

    getAssignableRoles(): Observable<ListResultDto<{ id: string; name: string; isDefault: boolean; isStatic: boolean; isPublic: boolean }>> {
        return this.http.get<ListResultDto<{ id: string; name: string; isDefault: boolean; isStatic: boolean; isPublic: boolean }>>(`${this.baseUrl}/assignable-roles`);
    }

    findByUsername(userName: string): Observable<IdentityUserDto> {
        return this.http.get<IdentityUserDto>(`${this.baseUrl}/by-username/${userName}`);
    }

    findByEmail(email: string): Observable<IdentityUserDto> {
        return this.http.get<IdentityUserDto>(`${this.baseUrl}/by-email/${email}`);
    }
}

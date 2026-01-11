import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedResultDto, ListResultDto } from './identity-user.service';

// Identity Role DTOs
export interface IdentityRoleDto {
    id: string;
    name: string;
    isDefault: boolean;
    isStatic: boolean;
    isPublic: boolean;
    concurrencyStamp?: string;
    extraProperties?: Record<string, any>;
}

export interface IdentityRoleCreateDto {
    name: string;
    isDefault: boolean;
    isPublic: boolean;
}

export interface IdentityRoleUpdateDto {
    name: string;
    isDefault: boolean;
    isPublic: boolean;
    concurrencyStamp?: string;
}

export interface GetIdentityRolesInput {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class IdentityRoleService {
    private readonly baseUrl = `${environment.apiUrl}/api/identity/roles`;

    constructor(private http: HttpClient) { }

    getList(input?: GetIdentityRolesInput): Observable<PagedResultDto<IdentityRoleDto>> {
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

        return this.http.get<PagedResultDto<IdentityRoleDto>>(this.baseUrl, { params });
    }

    getAllList(): Observable<ListResultDto<IdentityRoleDto>> {
        return this.http.get<ListResultDto<IdentityRoleDto>>(`${this.baseUrl}/all`);
    }

    get(id: string): Observable<IdentityRoleDto> {
        return this.http.get<IdentityRoleDto>(`${this.baseUrl}/${id}`);
    }

    create(input: IdentityRoleCreateDto): Observable<IdentityRoleDto> {
        return this.http.post<IdentityRoleDto>(this.baseUrl, input);
    }

    update(id: string, input: IdentityRoleUpdateDto): Observable<IdentityRoleDto> {
        return this.http.put<IdentityRoleDto>(`${this.baseUrl}/${id}`, input);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

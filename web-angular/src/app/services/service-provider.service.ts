import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PagedResultDto<T> {
    totalCount: number;
    items: T[];
}

export interface ServiceProviderDto {
    id: string;
    name: string;
    description?: string;
    logoUrl?: string;
    contactEmail?: string;
    contactPhone?: string;
    websiteUrl?: string;
    address?: string;
    category?: string;
    isActive: boolean;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    linkedInUrl?: string;
    creationTime: string;
}

export interface CreateUpdateServiceProviderDto {
    name: string;
    description?: string;
    logoUrl?: string;
    contactEmail?: string;
    contactPhone?: string;
    websiteUrl?: string;
    address?: string;
    category?: string;
    isActive: boolean;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    linkedInUrl?: string;
}

export interface GetServiceProviderInput {
    filter?: string;
    category?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ServiceProviderService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/service-provider`;

    constructor(private http: HttpClient) { }

    getList(input?: GetServiceProviderInput): Observable<PagedResultDto<ServiceProviderDto>> {
        let params = new HttpParams();
        if (input) {
            if (input.filter) params = params.set('Filter', input.filter);
            if (input.category) params = params.set('Category', input.category);
            if (input.sorting) params = params.set('Sorting', input.sorting);
            if (input.skipCount !== undefined) params = params.set('SkipCount', input.skipCount.toString());
            if (input.maxResultCount !== undefined) params = params.set('MaxResultCount', input.maxResultCount.toString());
        }
        return this.http.get<PagedResultDto<ServiceProviderDto>>(this.baseUrl, { params });
    }

    get(id: string): Observable<ServiceProviderDto> {
        return this.http.get<ServiceProviderDto>(`${this.baseUrl}/${id}`);
    }

    create(input: CreateUpdateServiceProviderDto): Observable<ServiceProviderDto> {
        return this.http.post<ServiceProviderDto>(this.baseUrl, input);
    }

    update(id: string, input: CreateUpdateServiceProviderDto): Observable<ServiceProviderDto> {
        return this.http.put<ServiceProviderDto>(`${this.baseUrl}/${id}`, input);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/categories`);
    }
}

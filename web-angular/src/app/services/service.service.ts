import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedResultDto } from './service-provider.service';

export interface ServiceDto {
    id: string;
    serviceProviderId: string;
    name: string;
    description?: string;
    price?: number;
    priceUnit?: string;
    creationTime: string;
}

export interface CreateUpdateServiceDto {
    serviceProviderId: string;
    name: string;
    description?: string;
    price?: number;
    priceUnit?: string;
}

export interface GetServiceInput {
    serviceProviderId?: string; // Additional filter if needed, though standard CRUD uses generic filter
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/service`;

    constructor(private http: HttpClient) { }

    getList(input?: GetServiceInput): Observable<PagedResultDto<ServiceDto>> {
        let params = new HttpParams();
        if (input) {
            if (input.filter) params = params.set('Filter', input.filter);
            if (input.sorting) params = params.set('Sorting', input.sorting);
            if (input.skipCount !== undefined) params = params.set('SkipCount', input.skipCount.toString());
            if (input.maxResultCount !== undefined) params = params.set('MaxResultCount', input.maxResultCount.toString());
            // Note: serviceProviderId filtering depends on if AppService supports it via extended input.
            // Standard CrudAppService uses Filter string.
        }
        return this.http.get<PagedResultDto<ServiceDto>>(this.baseUrl, { params });
    }

    get(id: string): Observable<ServiceDto> {
        return this.http.get<ServiceDto>(`${this.baseUrl}/${id}`);
    }

    create(input: CreateUpdateServiceDto): Observable<ServiceDto> {
        return this.http.post<ServiceDto>(this.baseUrl, input);
    }

    update(id: string, input: CreateUpdateServiceDto): Observable<ServiceDto> {
        return this.http.put<ServiceDto>(`${this.baseUrl}/${id}`, input);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

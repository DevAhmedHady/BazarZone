import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedResultDto } from './service-provider.service';

export interface ProviderApplicationDto {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phoneNumber: string;
    businessDescription: string;
    websiteUrl: string;
    address: string;
    status: string; // "Pending", "Approved", "Rejected"
    creationTime: string;
}

export interface CreateProviderApplicationDto {
    companyName: string;
    contactPerson: string;
    email: string;
    phoneNumber: string;
    businessDescription?: string;
    websiteUrl?: string;
    address?: string;
}

export interface GetProviderApplicationListInput {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProviderApplicationService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/provider-application`;

    constructor(private http: HttpClient) { }

    getList(input?: GetProviderApplicationListInput): Observable<PagedResultDto<ProviderApplicationDto>> {
        let params = new HttpParams();
        if (input) {
            if (input.filter) params = params.set('Filter', input.filter);
            if (input.sorting) params = params.set('Sorting', input.sorting);
            if (input.skipCount !== undefined) params = params.set('SkipCount', input.skipCount.toString());
            if (input.maxResultCount !== undefined) params = params.set('MaxResultCount', input.maxResultCount.toString());
        }
        return this.http.get<PagedResultDto<ProviderApplicationDto>>(this.baseUrl, { params });
    }

    create(input: CreateProviderApplicationDto): Observable<ProviderApplicationDto> {
        return this.http.post<ProviderApplicationDto>(this.baseUrl, input);
    }

    update(id: string, input: any): Observable<ProviderApplicationDto> {
        return this.http.put<ProviderApplicationDto>(`${this.baseUrl}/${id}`, input);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    updateStatus(id: string, status: number): Observable<ProviderApplicationDto> {
        return this.http.put<ProviderApplicationDto>(`${this.baseUrl}/${id}/status`, { status });
    }
}


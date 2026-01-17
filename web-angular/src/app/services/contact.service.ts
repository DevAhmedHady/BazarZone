import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedResultDto } from './service-provider.service';

export interface ContactRequestDto {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isProcessed: boolean;
    creationTime: string;
}

export interface CreateContactRequestDto {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface GetContactRequestListInput {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/contact`;

    constructor(private http: HttpClient) { }

    getList(input?: GetContactRequestListInput): Observable<PagedResultDto<ContactRequestDto>> {
        let params = new HttpParams();
        if (input) {
            if (input.filter) params = params.set('Filter', input.filter);
            if (input.sorting) params = params.set('Sorting', input.sorting);
            if (input.skipCount !== undefined) params = params.set('SkipCount', input.skipCount.toString());
            if (input.maxResultCount !== undefined) params = params.set('MaxResultCount', input.maxResultCount.toString());
        }
        return this.http.get<PagedResultDto<ContactRequestDto>>(this.baseUrl, { params });
    }

    create(input: CreateContactRequestDto): Observable<ContactRequestDto> {
        return this.http.post<ContactRequestDto>(this.baseUrl, input);
    }

    // Likely Admin actions
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // Maybe update to mark as processed?
    update(id: string, input: any): Observable<ContactRequestDto> {
        return this.http.put<ContactRequestDto>(`${this.baseUrl}/${id}`, input);
    }
}

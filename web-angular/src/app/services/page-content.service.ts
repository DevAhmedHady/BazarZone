import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedResultDto } from './service-provider.service';

export enum PageContentType {
    Text = 0,
    Html = 1,
    Image = 2,
    Link = 3
}

export interface PageContentDto {
    id: string;
    key: string;
    value: string;
    section?: string;
    type: PageContentType;
    creationTime: string;
}

export interface CreateUpdatePageContentDto {
    key: string;
    value: string;
    section?: string;
    type: PageContentType;
}

export interface GetPageContentInput {
    filter?: string;
    sorting?: string;
    section?: string;
    skipCount?: number;
    maxResultCount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class PageContentService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/page-content`;

    constructor(private http: HttpClient) { }

    getList(input?: GetPageContentInput): Observable<PagedResultDto<PageContentDto>> {
        let params = new HttpParams();
        if (input) {
            if (input.filter) params = params.set('Filter', input.filter);
            if (input.section) params = params.set('Section', input.section);
            if (input.sorting) params = params.set('Sorting', input.sorting);
            if (input.skipCount !== undefined) params = params.set('SkipCount', input.skipCount.toString());
            if (input.maxResultCount !== undefined) params = params.set('MaxResultCount', input.maxResultCount.toString());
        }

        return this.http.get<PagedResultDto<PageContentDto>>(this.baseUrl, { params });
    }

    get(id: string): Observable<PageContentDto> {
        return this.http.get<PageContentDto>(`${this.baseUrl}/${id}`);
    }

    getContent(key: string): Observable<string> {
        return this.http.get(`${this.baseUrl}/content/${key}`, { responseType: 'text' });
    }

    getSectionContent(section: string): Observable<{ [key: string]: string }> {
        return this.http.get<{ [key: string]: string }>(`${this.baseUrl}/section/${section}`);
    }

    create(input: CreateUpdatePageContentDto): Observable<PageContentDto> {
        return this.http.post<PageContentDto>(this.baseUrl, input);
    }

    update(id: string, input: CreateUpdatePageContentDto): Observable<PageContentDto> {
        return this.http.put<PageContentDto>(`${this.baseUrl}/${id}`, input);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

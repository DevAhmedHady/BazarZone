import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedResultDto } from './service-provider.service';

export interface ProductDto {
    id: string;
    serviceProviderId: string;
    name: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    creationTime: string;
}

export interface CreateUpdateProductDto {
    serviceProviderId: string;
    name: string;
    description?: string;
    price?: number;
    imageUrl?: string;
}

export interface GetProductInput {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/product`;

    constructor(private http: HttpClient) { }

    getList(input?: GetProductInput): Observable<PagedResultDto<ProductDto>> {
        let params = new HttpParams();
        if (input) {
            if (input.filter) params = params.set('Filter', input.filter);
            if (input.sorting) params = params.set('Sorting', input.sorting);
            if (input.skipCount !== undefined) params = params.set('SkipCount', input.skipCount.toString());
            if (input.maxResultCount !== undefined) params = params.set('MaxResultCount', input.maxResultCount.toString());
        }
        return this.http.get<PagedResultDto<ProductDto>>(this.baseUrl, { params });
    }

    get(id: string): Observable<ProductDto> {
        return this.http.get<ProductDto>(`${this.baseUrl}/${id}`);
    }

    create(input: CreateUpdateProductDto): Observable<ProductDto> {
        return this.http.post<ProductDto>(this.baseUrl, input);
    }

    update(id: string, input: CreateUpdateProductDto): Observable<ProductDto> {
        return this.http.put<ProductDto>(`${this.baseUrl}/${id}`, input);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

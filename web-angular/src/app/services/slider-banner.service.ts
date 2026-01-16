import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagedResultDto } from './service-provider.service';

export enum SliderPosition {
    BeforeHero = 0,
    AfterHero = 1
}

export interface SliderBannerDto {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
    position: SliderPosition;
    sortOrder: number;
    isVisible: boolean;
    startDate?: string;
    endDate?: string;
    creationTime: string;
}

export interface CreateUpdateSliderBannerDto {
    title: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
    position: SliderPosition;
    sortOrder: number;
    isVisible: boolean;
    startDate?: string;
    endDate?: string;
}

export interface GetSliderBannerInput {
    filter?: string;
    sorting?: string;
    skipCount?: number;
    maxResultCount?: number;
}

@Injectable({
    providedIn: 'root'
})
export class SliderBannerService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/slider-banner`;

    constructor(private http: HttpClient) { }

    getList(input?: GetSliderBannerInput): Observable<PagedResultDto<SliderBannerDto>> {
        let params = new HttpParams();
        if (input) {
            if (input.filter) params = params.set('Filter', input.filter);
            if (input.sorting) params = params.set('Sorting', input.sorting);
            if (input.skipCount !== undefined) params = params.set('SkipCount', input.skipCount.toString());
            if (input.maxResultCount !== undefined) params = params.set('MaxResultCount', input.maxResultCount.toString());
        }
        return this.http.get<PagedResultDto<SliderBannerDto>>(this.baseUrl, { params });
    }

    get(id: string): Observable<SliderBannerDto> {
        return this.http.get<SliderBannerDto>(`${this.baseUrl}/${id}`);
    }

    getActiveByPosition(position: SliderPosition): Observable<SliderBannerDto[]> {
        return this.http.get<SliderBannerDto[]>(`${this.baseUrl}/active/${position}`);
    }

    create(input: CreateUpdateSliderBannerDto): Observable<SliderBannerDto> {
        return this.http.post<SliderBannerDto>(this.baseUrl, input);
    }

    update(id: string, input: CreateUpdateSliderBannerDto): Observable<SliderBannerDto> {
        return this.http.put<SliderBannerDto>(`${this.baseUrl}/${id}`, input);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

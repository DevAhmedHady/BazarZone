import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VisitLogDto } from '../models/visit-log';

export interface PagedResultDto<T> {
  totalCount: number;
  items: T[];
}

export interface PagedAndSortedResultRequestDto {
  sorting?: string;
  skipCount?: number;
  maxResultCount?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VisitLogService {
  private readonly baseUrl = `${environment.apiUrl}/api/app/visit-log`;

  constructor(private http: HttpClient) { }

  track(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/track`, {});
  }

  getList(input: PagedAndSortedResultRequestDto): Observable<PagedResultDto<VisitLogDto>> {
    let params = new HttpParams();
    if (input.sorting) params = params.set('Sorting', input.sorting);
    if (input.skipCount !== undefined) params = params.set('SkipCount', input.skipCount.toString());
    if (input.maxResultCount !== undefined) params = params.set('MaxResultCount', input.maxResultCount.toString());

    return this.http.get<PagedResultDto<VisitLogDto>>(this.baseUrl, { params });
  }
}

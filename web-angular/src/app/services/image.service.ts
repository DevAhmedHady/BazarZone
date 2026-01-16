import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AppImageDto {
    id: string;
    fileName: string;
    mimeType: string;
    size: number;
}

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/images`;

    constructor(private http: HttpClient) { }

    upload(file: File, referenceType?: string, referenceId?: string): Observable<AppImageDto> {
        const formData = new FormData();
        formData.append('file', file);
        if (referenceType) formData.append('referenceType', referenceType);
        if (referenceId) formData.append('referenceId', referenceId);

        return this.http.post<AppImageDto>(`${this.baseUrl}/upload`, formData);
    }

    getImageUrl(id: string): string {
        if (!id) return '';
        if (id.startsWith('http')) return id; // Already a URL
        return `${this.baseUrl}/${id}`;
    }
}

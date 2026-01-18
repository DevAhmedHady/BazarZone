import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface VisitorSubscriptionDto {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    ipAddress: string;
    creationTime: string;
}

export interface CreateVisitorSubscriptionDto {
    name: string;
    phoneNumber: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class VisitorSubscriptionService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/visitor-subscription`;

    constructor(private http: HttpClient) { }

    create(input: CreateVisitorSubscriptionDto): Observable<VisitorSubscriptionDto> {
        return this.http.post<VisitorSubscriptionDto>(this.baseUrl, input);
    }
}

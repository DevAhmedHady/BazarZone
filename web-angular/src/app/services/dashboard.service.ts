import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DashboardSummaryDto {
    totalVisitors: number;
    visitorsThisPeriod: number;
    visitorsPreviousPeriod: number;
    visitorsGrowthPercentage: number;

    totalProviders: number;
    providersThisPeriod: number;
    providersPreviousPeriod: number;
    providersGrowthPercentage: number;

    totalProducts: number;
    productsThisPeriod: number;
    productsPreviousPeriod: number;
    productsGrowthPercentage: number;

    totalServices: number;
    servicesThisPeriod: number;
    servicesPreviousPeriod: number;
    servicesGrowthPercentage: number;

    totalUsers: number;
    usersThisPeriod: number;
    usersPreviousPeriod: number;
    usersGrowthPercentage: number;

    pendingProviderApplications: number;
    pendingProviderApplicationsThisPeriod: number;
    pendingProviderApplicationsPreviousPeriod: number;
    pendingProviderApplicationsGrowthPercentage: number;

    contactRequestsThisPeriod: number;
}

export interface DashboardTimeseriesPointDto {
    periodStart: string;
    visitors: number;
    providers: number;
    products: number;
    services: number;
}

export interface DashboardTimeseriesDto {
    points: DashboardTimeseriesPointDto[];
}

export interface DashboardRecentActivityDto {
    type: string;
    titleKey: string;
    description: string;
    time: string;
}

export interface DashboardSettingsDto {
    visitorCountMode: 'Hits' | 'UniqueIp';
    periodDays: number;
}

export interface UpdateDashboardSettingsDto {
    visitorCountMode: 'Hits' | 'UniqueIp';
    periodDays: number;
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private readonly baseUrl = `${environment.apiUrl}/api/app/dashboard`;

    constructor(private http: HttpClient) { }

    getSummary(): Observable<DashboardSummaryDto> {
        return this.http.get<DashboardSummaryDto>(`${this.baseUrl}/summary`);
    }

    getTimeseries(period: 'daily' | 'weekly' | 'monthly'): Observable<DashboardTimeseriesDto> {
        let params = new HttpParams().set('Period', period);
        return this.http.get<DashboardTimeseriesDto>(`${this.baseUrl}/timeseries`, { params });
    }

    getRecentActivity(): Observable<DashboardRecentActivityDto[]> {
        return this.http.get<DashboardRecentActivityDto[]>(`${this.baseUrl}/recent-activity`);
    }

    getSettings(): Observable<DashboardSettingsDto> {
        return this.http.get<DashboardSettingsDto>(`${this.baseUrl}/settings`);
    }

    updateSettings(settings: UpdateDashboardSettingsDto): Observable<DashboardSettingsDto> {
        return this.http.put<DashboardSettingsDto>(`${this.baseUrl}/settings`, settings);
    }

    trackVisit(): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/api/app/visit-log/track`, {});
    }
}

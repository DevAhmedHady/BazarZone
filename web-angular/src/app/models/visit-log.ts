export interface VisitLogDto {
    id: string;
    path: string;
    queryString?: string;
    method?: string;
    referrerUrl?: string;
    userAgent?: string;
    ipAddress?: string;
    isAuthenticated: boolean;
    userId?: string;
    source?: string;
    creationTime: string;
}

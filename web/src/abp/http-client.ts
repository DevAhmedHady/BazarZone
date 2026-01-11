/**
 * ABP HTTP Client
 * Axios-based HTTP client with ABP-specific interceptors
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { environment } from './environment';

// Create axios instance for ABP API
export const abpHttpClient: AxiosInstance = axios.create({
  baseURL: environment.apis.default.url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token storage key
const ACCESS_TOKEN_KEY = 'abp_access_token';
const TENANT_ID_KEY = 'abp_tenant_id';

/**
 * Get stored access token
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Set access token
 */
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * Remove access token
 */
export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * Get current tenant ID
 */
export const getTenantId = (): string | null => {
  return localStorage.getItem(TENANT_ID_KEY);
};

/**
 * Set tenant ID
 */
export const setTenantId = (tenantId: string): void => {
  localStorage.setItem(TENANT_ID_KEY, tenantId);
};

/**
 * Remove tenant ID
 */
export const removeTenantId = (): void => {
  localStorage.removeItem(TENANT_ID_KEY);
};

// Request interceptor - adds auth and ABP headers
abpHttpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Authorization header
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add ABP tenant header
    const tenantId = getTenantId();
    if (tenantId) {
      config.headers['__tenant'] = tenantId;
    }

    // Add Accept-Language header
    const currentLanguage = localStorage.getItem('abp_language') || navigator.language || 'en';
    config.headers['Accept-Language'] = currentLanguage;

    // Add ABP request culture header
    config.headers['.AspNetCore.Culture'] = `c=${currentLanguage}|uic=${currentLanguage}`;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles ABP error responses
abpHttpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle ABP error format
      const abpError = data as AbpErrorResponse;
      if (abpError?.error) {
        console.error('ABP Error:', abpError.error.message);
        
        // Handle specific error codes
        if (status === 401) {
          // Unauthorized - could redirect to login
          console.warn('Unauthorized access. Please login.');
        } else if (status === 403) {
          console.warn('Forbidden. You do not have permission.');
        }
      }
    }

    return Promise.reject(error);
  }
);

// ABP Error Response interface
export interface AbpErrorResponse {
  error: {
    code?: string;
    message: string;
    details?: string;
    data?: Record<string, unknown>;
    validationErrors?: Array<{
      message: string;
      members: string[];
    }>;
  };
}

// ABP Paged Result interface
export interface PagedResultDto<T> {
  items: T[];
  totalCount: number;
}

// ABP Paged Request interface
export interface PagedAndSortedResultRequestDto {
  skipCount?: number;
  maxResultCount?: number;
  sorting?: string;
}

// ABP Audited Entity interface
export interface AuditedEntityDto<TKey = string> {
  id: TKey;
  creationTime: string;
  creatorId?: string;
  lastModificationTime?: string;
  lastModifierId?: string;
}

export default abpHttpClient;

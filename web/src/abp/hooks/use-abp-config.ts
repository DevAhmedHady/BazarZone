/**
 * React Query hooks for ABP Application Configuration
 * Provides data fetching hooks for ABP configuration, localization, and permissions
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { 
  abpApplicationConfigurationService, 
  ApplicationConfigurationDto 
} from '../services/abp-application-configuration-service';

// Query key factory
export const abpConfigKeys = {
  all: ['abp-config'] as const,
  config: () => [...abpConfigKeys.all, 'application-configuration'] as const,
};

/**
 * Hook to fetch ABP application configuration
 */
export function useAbpConfig(
  includeLocalizationResources = true
): UseQueryResult<ApplicationConfigurationDto, Error> {
  return useQuery({
    queryKey: abpConfigKeys.config(),
    queryFn: () => abpApplicationConfigurationService.get(includeLocalizationResources),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

/**
 * Hook to get current user info from ABP config
 */
export function useCurrentUser() {
  const { data, isLoading, error, isError, isSuccess } = useAbpConfig(false);
  
  return {
    data: data?.currentUser,
    isLoading,
    error,
    isError,
    isSuccess,
  };
}

/**
 * Hook to get localization resources
 */
export function useLocalization(resourceName?: string): {
  isLoading: boolean;
  localize: (key: string, defaultValue?: string) => string;
  currentCulture: ApplicationConfigurationDto['localization']['currentCulture'] | undefined;
  languages: ApplicationConfigurationDto['localization']['languages'];
} {
  const { data, isLoading } = useAbpConfig(true);

  const localize = (key: string, defaultValue?: string): string => {
    if (!data?.localization?.values) {
      return defaultValue || key;
    }

    const resource = resourceName || data.localization.defaultResourceName || '';
    const resourceValues = data.localization.values[resource];
    
    if (resourceValues && resourceValues[key]) {
      return resourceValues[key];
    }

    // Search in all resources
    for (const res of Object.values(data.localization.values)) {
      if (res[key]) {
        return res[key];
      }
    }

    return defaultValue || key;
  };

  return {
    isLoading,
    localize,
    currentCulture: data?.localization?.currentCulture,
    languages: data?.localization?.languages || [],
  };
}

/**
 * Hook to check permissions
 */
export function usePermissions(): {
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  grantedPermissions: string[];
} {
  const { data, isLoading } = useAbpConfig(false);

  const hasPermission = (permission: string): boolean => {
    return data?.auth?.grantedPolicies?.[permission] === true;
  };

  const grantedPermissions = Object.keys(data?.auth?.grantedPolicies || {}).filter(
    (key) => data?.auth?.grantedPolicies?.[key] === true
  );

  return {
    isLoading,
    hasPermission,
    grantedPermissions,
  };
}

/**
 * Hook to get feature values
 */
export function useFeatures(): {
  isLoading: boolean;
  isEnabled: (featureName: string) => boolean;
  getValue: (featureName: string) => string | undefined;
} {
  const { data, isLoading } = useAbpConfig(false);

  const isEnabled = (featureName: string): boolean => {
    const value = data?.features?.values?.[featureName];
    return value === 'true' || value === 'True';
  };

  const getValue = (featureName: string): string | undefined => {
    return data?.features?.values?.[featureName];
  };

  return {
    isLoading,
    isEnabled,
    getValue,
  };
}

/**
 * Hook to get current tenant info
 */
export function useCurrentTenant() {
  const { data, isLoading, error, isError, isSuccess } = useAbpConfig(false);
  
  return {
    data: data?.currentTenant,
    isLoading,
    error,
    isError,
    isSuccess,
  };
}

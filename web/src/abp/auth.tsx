/**
 * ABP Authentication Context and Provider
 * Uses oidc-client-ts and react-oidc-context for OpenID Connect authentication
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { AuthProvider as OidcProvider, useAuth as useOidcAuth } from 'react-oidc-context';
import { WebStorageStateStore, User } from 'oidc-client-ts';
import { environment } from './environment';
import { setAccessToken, removeAccessToken } from './http-client';

// OIDC Configuration for ABP/OpenIddict
const oidcConfig = {
  authority: environment.oAuthConfig.issuer,
  client_id: environment.oAuthConfig.clientId,
  redirect_uri: environment.oAuthConfig.redirectUri,
  post_logout_redirect_uri: environment.oAuthConfig.postLogoutRedirectUri,
  response_type: environment.oAuthConfig.responseType,
  scope: environment.oAuthConfig.scope,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  loadUserInfo: true,
};

// ABP User interface
export interface AbpUser {
  id?: string;
  userName?: string;
  email?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  roles?: string[];
  isAuthenticated: boolean;
}

// ABP Auth Context interface
interface AbpAuthContextType {
  user: AbpUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null | undefined;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AbpAuthContext = createContext<AbpAuthContextType | undefined>(undefined);

// Internal auth hook component
const AbpAuthProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useOidcAuth();
  const [abpUser, setAbpUser] = useState<AbpUser | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  const fetchPermissions = useCallback(async (accessToken: string) => {
    // Fetch permissions from ABP API
    // GET /api/abp/application-configuration
    try {
      const response = await fetch(`${environment.apis.default.url}/api/abp/application-configuration`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const config = await response.json();
        const grantedPermissions = Object.keys(config.auth?.grantedPolicies || {});
        setPermissions(grantedPermissions);
      }
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
    }
  }, []);

  useEffect(() => {
    if (auth.user) {
      // Extract user info from OIDC claims
      const user: AbpUser = {
        id: auth.user.profile.sub,
        userName: auth.user.profile.preferred_username || auth.user.profile.name,
        email: auth.user.profile.email,
        name: auth.user.profile.given_name,
        surname: auth.user.profile.family_name,
        phoneNumber: auth.user.profile.phone_number,
        roles: (auth.user.profile.role as string[]) || [],
        isAuthenticated: true,
      };
      setAbpUser(user);
      
      // Store access token for HTTP client
      if (auth.user.access_token) {
        setAccessToken(auth.user.access_token);
        fetchPermissions(auth.user.access_token);
      }
    } else {
      setAbpUser(null);
      removeAccessToken();
      setPermissions([]);
    }
  }, [auth.user, fetchPermissions]);

  const login = async () => {
    await auth.signinRedirect();
  };

  const logout = async () => {
    removeAccessToken();
    await auth.signoutRedirect();
  };

  const getAccessToken = () => {
    return auth.user?.access_token;
  };

  const hasRole = (role: string): boolean => {
    return abpUser?.roles?.includes(role) || false;
  };

  const hasPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  // Handle callback from OAuth redirect
  useEffect(() => {
    // Check if this is a callback from OAuth
    if (window.location.search.includes('code=') || window.location.search.includes('error=')) {
      // The library handles this automatically
    }
  }, []);

  const value: AbpAuthContextType = {
    user: abpUser,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    login,
    logout,
    getAccessToken,
    hasRole,
    hasPermission,
  };

  return (
    <AbpAuthContext.Provider value={value}>
      {children}
    </AbpAuthContext.Provider>
  );
};

// ABP Auth Provider component
export const AbpAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const onSigninCallback = (_user: User | void): void => {
    // Remove the code and state from the URL after successful login
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <OidcProvider {...oidcConfig} onSigninCallback={onSigninCallback}>
      <AbpAuthProviderInner>
        {children}
      </AbpAuthProviderInner>
    </OidcProvider>
  );
};

// Hook to use ABP auth
export const useAbpAuth = (): AbpAuthContextType => {
  const context = useContext(AbpAuthContext);
  if (context === undefined) {
    throw new Error('useAbpAuth must be used within an AbpAuthProvider');
  }
  return context;
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredPermission?: string
): React.FC<P> => {
  return (props: P) => {
    const { isAuthenticated, isLoading, hasPermission, login } = useAbpAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      login();
      return <div>Redirecting to login...</div>;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      return <div>You do not have permission to access this page.</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default AbpAuthProvider;

/**
 * ABP Environment Configuration
 * Configure your ABP backend API and OAuth settings here
 */

export interface AbpEnvironment {
  production: boolean;
  application: {
    name: string;
    logoUrl?: string;
  };
  oAuthConfig: {
    issuer: string;
    clientId: string;
    scope: string;
    responseType: string;
    redirectUri: string;
    postLogoutRedirectUri: string;
  };
  apis: {
    default: {
      url: string;
      rootNamespace: string;
    };
  };
  localization: {
    defaultResourceName: string;
  };
}

export const environment: AbpEnvironment = {
  production: import.meta.env.PROD,
  application: {
    name: 'BazarZone',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: import.meta.env.VITE_API_URL || 'https://localhost:44321',
    clientId: 'BazarZone_React',
    scope: 'openid profile email BazarZone offline_access',
    responseType: 'code',
    redirectUri: import.meta.env.VITE_APP_URL || 'http://localhost:8080',
    postLogoutRedirectUri: import.meta.env.VITE_APP_URL || 'http://localhost:8080',
  },
  apis: {
    default: {
      url: import.meta.env.VITE_API_URL || 'https://localhost:44321',
      rootNamespace: 'BazarZone',
    },
  },
  localization: {
    defaultResourceName: 'BazarZone',
  },
};

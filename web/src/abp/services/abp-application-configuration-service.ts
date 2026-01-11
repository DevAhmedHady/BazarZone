/**
 * ABP Application Configuration Service
 * Fetches ABP application configuration including auth, localization, features, settings
 */

import abpHttpClient from '../http-client';

// ABP Application Configuration DTOs
export interface ApplicationConfigurationDto {
  localization: LocalizationDto;
  auth: AuthDto;
  setting: SettingDto;
  currentUser: CurrentUserDto;
  features: FeaturesDto;
  multiTenancy: MultiTenancyDto;
  currentTenant: CurrentTenantDto;
  timing: TimingDto;
  clock: ClockDto;
  objectExtensions: ObjectExtensionsDto;
}

export interface LocalizationDto {
  values: Record<string, Record<string, string>>;
  languages: LanguageDto[];
  currentCulture: CurrentCultureDto;
  defaultResourceName?: string;
  languagesMap: Record<string, NameValueDto[]>;
  languageFilesMap: Record<string, NameValueDto[]>;
}

export interface LanguageDto {
  cultureName: string;
  uiCultureName: string;
  displayName: string;
  flagIcon?: string;
}

export interface CurrentCultureDto {
  displayName: string;
  englishName: string;
  threeLetterIsoLanguageName: string;
  twoLetterIsoLanguageName: string;
  isRightToLeft: boolean;
  cultureName: string;
  name: string;
  nativeName: string;
  dateTimeFormat: DateTimeFormatDto;
}

export interface DateTimeFormatDto {
  calendarAlgorithmType: string;
  dateTimeFormatLong: string;
  shortDatePattern: string;
  fullDateTimePattern: string;
  dateSeparator: string;
  shortTimePattern: string;
  longTimePattern: string;
}

export interface NameValueDto {
  name: string;
  value: string;
}

export interface AuthDto {
  policies: Record<string, boolean>;
  grantedPolicies: Record<string, boolean>;
}

export interface SettingDto {
  values: Record<string, string>;
}

export interface CurrentUserDto {
  isAuthenticated: boolean;
  id?: string;
  tenantId?: string;
  impersonatorUserId?: string;
  impersonatorTenantId?: string;
  impersonatorUserName?: string;
  impersonatorTenantName?: string;
  userName?: string;
  name?: string;
  surName?: string;
  email?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  phoneNumberVerified: boolean;
  roles: string[];
}

export interface FeaturesDto {
  values: Record<string, string>;
}

export interface MultiTenancyDto {
  isEnabled: boolean;
}

export interface CurrentTenantDto {
  id?: string;
  name?: string;
  isAvailable: boolean;
}

export interface TimingDto {
  timeZone: TimeZoneDto;
}

export interface TimeZoneDto {
  iana: IanaTimeZoneDto;
  windows: WindowsTimeZoneDto;
}

export interface IanaTimeZoneDto {
  timeZoneName: string;
}

export interface WindowsTimeZoneDto {
  timeZoneId: string;
}

export interface ClockDto {
  kind: string;
}

export interface ObjectExtensionsDto {
  modules: Record<string, ModuleExtensionDto>;
  enums: Record<string, ExtensionEnumDto>;
}

export interface ModuleExtensionDto {
  entities: Record<string, EntityExtensionDto>;
}

export interface EntityExtensionDto {
  properties: Record<string, ExtensionPropertyDto>;
  configuration: Record<string, unknown>;
}

export interface ExtensionPropertyDto {
  type: string;
  typeSimple: string;
  displayName?: LocalizableStringDto;
  api: ExtensionPropertyApiDto;
  ui: ExtensionPropertyUiDto;
  attributes: ExtensionPropertyAttributeDto[];
  configuration: Record<string, unknown>;
  defaultValue?: unknown;
}

export interface LocalizableStringDto {
  name: string;
  resource?: string;
}

export interface ExtensionPropertyApiDto {
  onGet: ExtensionPropertyApiGetDto;
  onCreate: ExtensionPropertyApiCreateDto;
  onUpdate: ExtensionPropertyApiUpdateDto;
}

export interface ExtensionPropertyApiGetDto {
  isAvailable: boolean;
}

export interface ExtensionPropertyApiCreateDto {
  isAvailable: boolean;
}

export interface ExtensionPropertyApiUpdateDto {
  isAvailable: boolean;
}

export interface ExtensionPropertyUiDto {
  onTable: ExtensionPropertyUiTableDto;
  onCreateForm: ExtensionPropertyUiFormDto;
  onEditForm: ExtensionPropertyUiFormDto;
  lookup: ExtensionPropertyUiLookupDto;
}

export interface ExtensionPropertyUiTableDto {
  isVisible: boolean;
}

export interface ExtensionPropertyUiFormDto {
  isVisible: boolean;
}

export interface ExtensionPropertyUiLookupDto {
  url?: string;
  resultListPropertyName?: string;
  displayPropertyName?: string;
  valuePropertyName?: string;
  filterParamName?: string;
}

export interface ExtensionPropertyAttributeDto {
  typeSimple: string;
  config: Record<string, unknown>;
}

export interface ExtensionEnumDto {
  fields: ExtensionEnumFieldDto[];
  localizationResource?: string;
}

export interface ExtensionEnumFieldDto {
  name: string;
  value: number;
}

// API endpoint
const API_ENDPOINT = '/api/abp/application-configuration';

/**
 * ABP Application Configuration Service
 */
export const abpApplicationConfigurationService = {
  /**
   * Get the full application configuration
   */
  async get(includeLocalizationResources = true): Promise<ApplicationConfigurationDto> {
    const response = await abpHttpClient.get<ApplicationConfigurationDto>(API_ENDPOINT, {
      params: { includeLocalizationResources },
    });
    return response.data;
  },
};

export default abpApplicationConfigurationService;

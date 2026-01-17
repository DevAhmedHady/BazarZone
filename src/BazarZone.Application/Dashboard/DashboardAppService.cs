using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.SettingManagement;
using Volo.Abp.Settings;
using Volo.Abp.Timing;
using BazarZone.Contact;
using BazarZone.Products;
using BazarZone.ServiceProviders;
using BazarZone.Services;
using BazarZone.Visitors;

namespace BazarZone.Dashboard
{
    [RemoteService]
    [Route("api/app/dashboard")]
    public class DashboardAppService : BazarZoneAppService, IDashboardAppService
    {
        private readonly IRepository<VisitLog, Guid> _visitLogRepository;
        private readonly IRepository<ServiceProvider, Guid> _serviceProviderRepository;
        private readonly IRepository<Service, Guid> _serviceRepository;
        private readonly IRepository<Product, Guid> _productRepository;
        private readonly IRepository<ProviderApplication, Guid> _providerApplicationRepository;
        private readonly IRepository<ContactRequest, Guid> _contactRequestRepository;
        private readonly IRepository<IdentityUser, Guid> _userRepository;
        private readonly IClock _clock;
        private readonly DashboardOptions _options;
        private readonly ISettingProvider _settingProvider;
        private readonly ISettingManager _settingManager;

        public DashboardAppService(
            IRepository<VisitLog, Guid> visitLogRepository,
            IRepository<ServiceProvider, Guid> serviceProviderRepository,
            IRepository<Service, Guid> serviceRepository,
            IRepository<Product, Guid> productRepository,
            IRepository<ProviderApplication, Guid> providerApplicationRepository,
            IRepository<ContactRequest, Guid> contactRequestRepository,
            IRepository<IdentityUser, Guid> userRepository,
            IClock clock,
            IOptions<DashboardOptions> options,
            ISettingProvider settingProvider,
            ISettingManager settingManager)
        {
            _visitLogRepository = visitLogRepository;
            _serviceProviderRepository = serviceProviderRepository;
            _serviceRepository = serviceRepository;
            _productRepository = productRepository;
            _providerApplicationRepository = providerApplicationRepository;
            _contactRequestRepository = contactRequestRepository;
            _userRepository = userRepository;
            _clock = clock;
            _options = options.Value;
            _settingProvider = settingProvider;
            _settingManager = settingManager;
        }

        [HttpGet("summary")]
        public async Task<DashboardSummaryDto> GetSummaryAsync()
        {
            var now = _clock.Now;
            var periodDays = await GetPeriodDaysAsync();
            var periodStart = now.Date.AddDays(-periodDays);
            var previousPeriodStart = periodStart.AddDays(-periodDays);

            var visitorCountMode = await GetVisitorCountModeAsync();

            var visitQuery = await _visitLogRepository.GetQueryableAsync();
            
            long totalVisitors, visitorsThisPeriod, visitorsPreviousPeriod;
            
            if (visitorCountMode == VisitorCountMode.UniqueIp)
            {
                // Count unique IPs
                totalVisitors = await AsyncExecuter.LongCountAsync(
                    visitQuery.Select(x => x.IpAddress).Distinct());
                visitorsThisPeriod = await AsyncExecuter.LongCountAsync(
                    visitQuery.Where(x => x.CreationTime >= periodStart && x.CreationTime < now)
                        .Select(x => x.IpAddress).Distinct());
                visitorsPreviousPeriod = await AsyncExecuter.LongCountAsync(
                    visitQuery.Where(x => x.CreationTime >= previousPeriodStart && x.CreationTime < periodStart)
                        .Select(x => x.IpAddress).Distinct());
            }
            else
            {
                // Count all hits (default)
                totalVisitors = await AsyncExecuter.LongCountAsync(visitQuery);
                visitorsThisPeriod = await AsyncExecuter.LongCountAsync(visitQuery.Where(x => x.CreationTime >= periodStart && x.CreationTime < now));
                visitorsPreviousPeriod = await AsyncExecuter.LongCountAsync(visitQuery.Where(x => x.CreationTime >= previousPeriodStart && x.CreationTime < periodStart));
            }

            var providerQuery = await _serviceProviderRepository.GetQueryableAsync();
            var totalProviders = await AsyncExecuter.LongCountAsync(providerQuery);
            var providersThisPeriod = await AsyncExecuter.LongCountAsync(providerQuery.Where(x => x.CreationTime >= periodStart && x.CreationTime < now));
            var providersPreviousPeriod = await AsyncExecuter.LongCountAsync(providerQuery.Where(x => x.CreationTime >= previousPeriodStart && x.CreationTime < periodStart));

            var productQuery = await _productRepository.GetQueryableAsync();
            var totalProducts = await AsyncExecuter.LongCountAsync(productQuery);
            var productsThisPeriod = await AsyncExecuter.LongCountAsync(productQuery.Where(x => x.CreationTime >= periodStart && x.CreationTime < now));
            var productsPreviousPeriod = await AsyncExecuter.LongCountAsync(productQuery.Where(x => x.CreationTime >= previousPeriodStart && x.CreationTime < periodStart));

            var serviceQuery = await _serviceRepository.GetQueryableAsync();
            var totalServices = await AsyncExecuter.LongCountAsync(serviceQuery);
            var servicesThisPeriod = await AsyncExecuter.LongCountAsync(serviceQuery.Where(x => x.CreationTime >= periodStart && x.CreationTime < now));
            var servicesPreviousPeriod = await AsyncExecuter.LongCountAsync(serviceQuery.Where(x => x.CreationTime >= previousPeriodStart && x.CreationTime < periodStart));

            var userQuery = await _userRepository.GetQueryableAsync();
            var totalUsers = await AsyncExecuter.LongCountAsync(userQuery);
            var usersThisPeriod = await AsyncExecuter.LongCountAsync(userQuery.Where(x => x.CreationTime >= periodStart && x.CreationTime < now));
            var usersPreviousPeriod = await AsyncExecuter.LongCountAsync(userQuery.Where(x => x.CreationTime >= previousPeriodStart && x.CreationTime < periodStart));

            var providerApplicationQuery = await _providerApplicationRepository.GetQueryableAsync();
            var pendingApplications = await AsyncExecuter.LongCountAsync(providerApplicationQuery.Where(x => x.Status == ProviderApplicationStatus.Pending));
            var pendingApplicationsThisPeriod = await AsyncExecuter.LongCountAsync(providerApplicationQuery.Where(x => x.Status == ProviderApplicationStatus.Pending && x.CreationTime >= periodStart && x.CreationTime < now));
            var pendingApplicationsPreviousPeriod = await AsyncExecuter.LongCountAsync(providerApplicationQuery.Where(x => x.Status == ProviderApplicationStatus.Pending && x.CreationTime >= previousPeriodStart && x.CreationTime < periodStart));

            var contactQuery = await _contactRequestRepository.GetQueryableAsync();
            var contactRequestsThisPeriod = await AsyncExecuter.LongCountAsync(contactQuery.Where(x => x.CreationTime >= periodStart && x.CreationTime < now));

            return new DashboardSummaryDto
            {
                TotalVisitors = totalVisitors,
                VisitorsThisPeriod = visitorsThisPeriod,
                VisitorsPreviousPeriod = visitorsPreviousPeriod,
                VisitorsGrowthPercentage = CalculateGrowthPercentage(visitorsThisPeriod, visitorsPreviousPeriod),

                TotalProviders = totalProviders,
                ProvidersThisPeriod = providersThisPeriod,
                ProvidersPreviousPeriod = providersPreviousPeriod,
                ProvidersGrowthPercentage = CalculateGrowthPercentage(providersThisPeriod, providersPreviousPeriod),

                TotalProducts = totalProducts,
                ProductsThisPeriod = productsThisPeriod,
                ProductsPreviousPeriod = productsPreviousPeriod,
                ProductsGrowthPercentage = CalculateGrowthPercentage(productsThisPeriod, productsPreviousPeriod),

                TotalServices = totalServices,
                ServicesThisPeriod = servicesThisPeriod,
                ServicesPreviousPeriod = servicesPreviousPeriod,
                ServicesGrowthPercentage = CalculateGrowthPercentage(servicesThisPeriod, servicesPreviousPeriod),

                TotalUsers = totalUsers,
                UsersThisPeriod = usersThisPeriod,
                UsersPreviousPeriod = usersPreviousPeriod,
                UsersGrowthPercentage = CalculateGrowthPercentage(usersThisPeriod, usersPreviousPeriod),

                PendingProviderApplications = pendingApplications,
                PendingProviderApplicationsThisPeriod = pendingApplicationsThisPeriod,
                PendingProviderApplicationsPreviousPeriod = pendingApplicationsPreviousPeriod,
                PendingProviderApplicationsGrowthPercentage = CalculateGrowthPercentage(pendingApplicationsThisPeriod, pendingApplicationsPreviousPeriod),

                ContactRequestsThisPeriod = contactRequestsThisPeriod
            };
        }

        [HttpGet("timeseries")]
        public async Task<DashboardTimeseriesDto> GetTimeseriesAsync(DashboardTimeseriesInputDto input)
        {
            var period = (input?.Period ?? "monthly").ToLowerInvariant();
            var now = _clock.Now;
            var visitorCountMode = await GetVisitorCountModeAsync();

            var (startDate, buckets, bucketSelector) = period switch
            {
                "daily" => (now.Date.AddDays(-29), 30, new Func<DateTime, DateTime>(dt => dt.Date)),
                "weekly" => (StartOfWeek(now.Date.AddDays(-7 * 11)), 12, new Func<DateTime, DateTime>(StartOfWeek)),
                _ => (new DateTime(now.Year, now.Month, 1).AddMonths(-11), 12, new Func<DateTime, DateTime>(dt => new DateTime(dt.Year, dt.Month, 1)))
            };

            var visitLogs = await _visitLogRepository.GetListAsync(x => x.CreationTime >= startDate && x.CreationTime <= now);
            var providers = await _serviceProviderRepository.GetListAsync(x => x.CreationTime >= startDate && x.CreationTime <= now);
            var products = await _productRepository.GetListAsync(x => x.CreationTime >= startDate && x.CreationTime <= now);
            var services = await _serviceRepository.GetListAsync(x => x.CreationTime >= startDate && x.CreationTime <= now);

            Dictionary<DateTime, long> visitGroups;
            if (visitorCountMode == VisitorCountMode.UniqueIp)
            {
                // Count unique IPs per period
                visitGroups = visitLogs.GroupBy(x => bucketSelector(x.CreationTime))
                    .ToDictionary(x => x.Key, x => (long)x.Select(v => v.IpAddress).Distinct().Count());
            }
            else
            {
                // Count all hits (default)
                visitGroups = visitLogs.GroupBy(x => bucketSelector(x.CreationTime))
                    .ToDictionary(x => x.Key, x => x.LongCount());
            }

            var providerGroups = providers.GroupBy(x => bucketSelector(x.CreationTime))
                .ToDictionary(x => x.Key, x => x.LongCount());
            var productGroups = products.GroupBy(x => bucketSelector(x.CreationTime))
                .ToDictionary(x => x.Key, x => x.LongCount());
            var serviceGroups = services.GroupBy(x => bucketSelector(x.CreationTime))
                .ToDictionary(x => x.Key, x => x.LongCount());

            var points = new List<DashboardTimeseriesPointDto>();
            for (var i = 0; i < buckets; i++)
            {
                var bucketStart = period switch
                {
                    "daily" => startDate.AddDays(i),
                    "weekly" => startDate.AddDays(i * 7),
                    _ => startDate.AddMonths(i)
                };

                points.Add(new DashboardTimeseriesPointDto
                {
                    PeriodStart = bucketStart,
                    Visitors = visitGroups.TryGetValue(bucketStart, out var visitors) ? visitors : 0,
                    Providers = providerGroups.TryGetValue(bucketStart, out var providersCount) ? providersCount : 0,
                    Products = productGroups.TryGetValue(bucketStart, out var productsCount) ? productsCount : 0,
                    Services = serviceGroups.TryGetValue(bucketStart, out var servicesCount) ? servicesCount : 0
                });
            }

            return new DashboardTimeseriesDto { Points = points };
        }

        [HttpGet("recent-activity")]
        public async Task<List<DashboardRecentActivityDto>> GetRecentActivityAsync()
        {
            var providerQuery = await _providerApplicationRepository.GetQueryableAsync();
            var recentProviderApps = await AsyncExecuter.ToListAsync(
                providerQuery.OrderByDescending(x => x.CreationTime).Take(5));

            var contactQuery = await _contactRequestRepository.GetQueryableAsync();
            var recentContacts = await AsyncExecuter.ToListAsync(
                contactQuery.OrderByDescending(x => x.CreationTime).Take(5));

            var userQuery = await _userRepository.GetQueryableAsync();
            var recentUsers = await AsyncExecuter.ToListAsync(
                userQuery.OrderByDescending(x => x.CreationTime).Take(5));

            var activity = new List<DashboardRecentActivityDto>();

            activity.AddRange(recentProviderApps.Select(app => new DashboardRecentActivityDto
            {
                Type = "provider",
                TitleKey = "providerApplicationReceived",
                Description = app.CompanyName,
                Time = app.CreationTime
            }));

            activity.AddRange(recentContacts.Select(contact => new DashboardRecentActivityDto
            {
                Type = "contact",
                TitleKey = "contactRequestReceived",
                Description = contact.Subject,
                Time = contact.CreationTime
            }));

            activity.AddRange(recentUsers.Select(user => new DashboardRecentActivityDto
            {
                Type = "user",
                TitleKey = "newUserRegistered",
                Description = user.Email ?? user.UserName,
                Time = user.CreationTime
            }));

            return activity
                .OrderByDescending(x => x.Time)
                .Take(8)
                .ToList();
        }

        [HttpGet("settings")]
        public Task<DashboardSettingsDto> GetSettingsAsync()
        {
            return GetSettingsInternalAsync();
        }

        [HttpPut("settings")]
        public Task<DashboardSettingsDto> UpdateSettingsAsync([FromBody] UpdateDashboardSettingsDto input)
        {
            return UpdateSettingsInternalAsync(input);
        }

        private async Task<DashboardSettingsDto> GetSettingsInternalAsync()
        {
            var visitorModeValue = await _settingProvider.GetOrNullAsync(DashboardSettingNames.VisitorCountMode);
            var periodDaysValue = await _settingProvider.GetOrNullAsync(DashboardSettingNames.PeriodDays);

            var visitorMode = ParseVisitorCountMode(visitorModeValue) ?? _options.VisitorCountMode;
            var periodDays = ParsePeriodDays(periodDaysValue) ?? _options.PeriodDays;

            return new DashboardSettingsDto
            {
                VisitorCountMode = visitorMode.ToString(),
                PeriodDays = periodDays
            };
        }

        private async Task<DashboardSettingsDto> UpdateSettingsInternalAsync(UpdateDashboardSettingsDto input)
        {
            VisitorCountMode visitorMode;
            int periodDays;

            // Parse and save visitor count mode
            if (ParseVisitorCountMode(input.VisitorCountMode) is VisitorCountMode mode)
            {
                visitorMode = mode;
                await _settingManager.SetGlobalAsync(
                    DashboardSettingNames.VisitorCountMode,
                    mode.ToString());
            }
            else
            {
                visitorMode = _options.VisitorCountMode;
            }

            // Parse and save period days
            if (input.PeriodDays > 0)
            {
                periodDays = input.PeriodDays;
                await _settingManager.SetGlobalAsync(
                    DashboardSettingNames.PeriodDays,
                    input.PeriodDays.ToString());
            }
            else
            {
                periodDays = _options.PeriodDays;
            }

            // Return the values we just saved (avoid cache issues)
            return new DashboardSettingsDto
            {
                VisitorCountMode = visitorMode.ToString(),
                PeriodDays = periodDays
            };
        }

        private async Task<VisitorCountMode> GetVisitorCountModeAsync()
        {
            var value = await _settingProvider.GetOrNullAsync(DashboardSettingNames.VisitorCountMode);
            return ParseVisitorCountMode(value) ?? _options.VisitorCountMode;
        }

        private async Task<int> GetPeriodDaysAsync()
        {
            var value = await _settingProvider.GetOrNullAsync(DashboardSettingNames.PeriodDays);
            return ParsePeriodDays(value) ?? _options.PeriodDays;
        }

        private static VisitorCountMode? ParseVisitorCountMode(string? value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return null;
            }

            return Enum.TryParse<VisitorCountMode>(value, true, out var mode) ? mode : null;
        }

        private static int? ParsePeriodDays(string? value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                return null;
            }

            return int.TryParse(value, out var parsed) && parsed > 0 ? parsed : null;
        }

        private static double CalculateGrowthPercentage(long current, long previous)
        {
            if (previous == 0)
            {
                return current > 0 ? 100 : 0;
            }

            return Math.Round(((double)(current - previous) / previous) * 100, 1);
        }

        private static DateTime StartOfWeek(DateTime date)
        {
            var diff = (7 + (date.DayOfWeek - DayOfWeek.Monday)) % 7;
            return date.AddDays(-1 * diff).Date;
        }
    }
}

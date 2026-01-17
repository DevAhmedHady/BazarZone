using System;

namespace BazarZone.Dashboard
{
    public class DashboardSummaryDto
    {
        public long TotalVisitors { get; set; }
        public long VisitorsThisPeriod { get; set; }
        public long VisitorsPreviousPeriod { get; set; }
        public double VisitorsGrowthPercentage { get; set; }

        public long TotalProviders { get; set; }
        public long ProvidersThisPeriod { get; set; }
        public long ProvidersPreviousPeriod { get; set; }
        public double ProvidersGrowthPercentage { get; set; }

        public long TotalProducts { get; set; }
        public long ProductsThisPeriod { get; set; }
        public long ProductsPreviousPeriod { get; set; }
        public double ProductsGrowthPercentage { get; set; }

        public long TotalServices { get; set; }
        public long ServicesThisPeriod { get; set; }
        public long ServicesPreviousPeriod { get; set; }
        public double ServicesGrowthPercentage { get; set; }

        public long TotalUsers { get; set; }
        public long UsersThisPeriod { get; set; }
        public long UsersPreviousPeriod { get; set; }
        public double UsersGrowthPercentage { get; set; }

        public long PendingProviderApplications { get; set; }
        public long PendingProviderApplicationsThisPeriod { get; set; }
        public long PendingProviderApplicationsPreviousPeriod { get; set; }
        public double PendingProviderApplicationsGrowthPercentage { get; set; }

        public long ContactRequestsThisPeriod { get; set; }
    }
}

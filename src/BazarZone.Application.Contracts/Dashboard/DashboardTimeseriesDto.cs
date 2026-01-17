using System;
using System.Collections.Generic;

namespace BazarZone.Dashboard
{
    public class DashboardTimeseriesDto
    {
        public List<DashboardTimeseriesPointDto> Points { get; set; } = new();
    }

    public class DashboardTimeseriesPointDto
    {
        public DateTime PeriodStart { get; set; }
        public long Visitors { get; set; }
        public long Providers { get; set; }
        public long Products { get; set; }
        public long Services { get; set; }
    }
}

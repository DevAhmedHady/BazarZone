using System;

namespace BazarZone.Dashboard
{
    public class DashboardRecentActivityDto
    {
        public string Type { get; set; } = string.Empty;
        public string TitleKey { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Time { get; set; }
    }
}

#nullable disable

namespace BazarZone.Dashboard
{
    /// <summary>
    /// Configuration options for the dashboard
    /// </summary>
    public class DashboardOptions
    {
        /// <summary>
        /// The section name in appsettings.json
        /// </summary>
        public const string SectionName = "Dashboard";

        /// <summary>
        /// How visitors should be counted (Hits or UniqueIp)
        /// </summary>
        public VisitorCountMode VisitorCountMode { get; set; } = VisitorCountMode.Hits;

        /// <summary>
        /// Number of days to consider for the current period (default: 30)
        /// </summary>
        public int PeriodDays { get; set; } = 30;
    }
}

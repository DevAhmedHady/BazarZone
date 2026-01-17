#nullable disable

namespace BazarZone.Dashboard
{
    public class DashboardSettingsDto
    {
        public string VisitorCountMode { get; set; }
        public int PeriodDays { get; set; }
    }

    public class UpdateDashboardSettingsDto
    {
        public string VisitorCountMode { get; set; }
        public int PeriodDays { get; set; }
    }
}

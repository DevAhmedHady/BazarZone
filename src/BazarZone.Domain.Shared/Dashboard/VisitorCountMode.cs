#nullable disable

namespace BazarZone.Dashboard
{
    /// <summary>
    /// Defines how visitors are counted in the dashboard
    /// </summary>
    public enum VisitorCountMode
    {
        /// <summary>
        /// Count all page hits/visits
        /// </summary>
        Hits = 0,

        /// <summary>
        /// Count unique IP addresses
        /// </summary>
        UniqueIp = 1
    }
}

using System;

namespace BazarZone.Visitors
{
    public class VisitorSummaryDto
    {
        public string IpAddress { get; set; } = string.Empty;
        public int VisitCount { get; set; }
        public DateTime FirstVisitTime { get; set; }
        public DateTime LastVisitTime { get; set; }
        
        public bool IsSubscribed { get; set; }
        public string? SubscriptionName { get; set; }
        public string? SubscriptionEmail { get; set; }
        public string? SubscriptionPhoneNumber { get; set; }
        public DateTime? SubscriptionDate { get; set; }
    }
}

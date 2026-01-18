using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Visitors
{
    public class VisitorSubscription : CreationAuditedEntity<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string IpAddress { get; set; } = string.Empty;
        public string? UserAgent { get; set; }
    }
}

using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Visitors
{
    public class VisitLog : CreationAuditedEntity<Guid>
    {
        public string Path { get; set; } = string.Empty;
        public string? ReferrerUrl { get; set; }
        public string? UserAgent { get; set; }
        public string? IpAddress { get; set; }
        public bool IsAuthenticated { get; set; }
        public Guid? UserId { get; set; }
        public string? Source { get; set; }

        public VisitLog()
        {
        }

        public VisitLog(Guid id, string path) : base(id)
        {
            Path = path;
        }
    }
}

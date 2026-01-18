using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.Visitors
{
    public class VisitLogDto : EntityDto<Guid>
    {
        public string Path { get; set; } = string.Empty;
        public string? QueryString { get; set; }
        public string? Method { get; set; }
        public string? ReferrerUrl { get; set; }
        public string? UserAgent { get; set; }
        public string? IpAddress { get; set; }
        public bool IsAuthenticated { get; set; }
        public Guid? UserId { get; set; }
        public string? Source { get; set; }
        public DateTime CreationTime { get; set; }
    }
}

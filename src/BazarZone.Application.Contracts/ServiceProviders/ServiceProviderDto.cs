using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.ServiceProviders
{
    public class ServiceProviderDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string LogoUrl { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public string WebsiteUrl { get; set; }
        public string Address { get; set; }
        public string Category { get; set; }
        public bool IsActive { get; set; }
    }
}

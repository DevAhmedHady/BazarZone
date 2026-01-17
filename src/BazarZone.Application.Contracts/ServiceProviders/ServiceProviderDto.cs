using System;
#nullable disable
using Volo.Abp.Application.Dtos;

namespace BazarZone.ServiceProviders
{
    public class ServiceProviderDto : AuditedEntityDto<Guid>
    {
        public ServiceProviderDto()
        {
            Name = string.Empty;
            Description = string.Empty;
            LogoUrl = string.Empty;
            ContactEmail = string.Empty;
            ContactPhone = string.Empty;
            WebsiteUrl = string.Empty;
            Address = string.Empty;
            Category = string.Empty;
        }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string LogoUrl { get; set; } = string.Empty;
        public string ContactEmail { get; set; } = string.Empty;
        public string ContactPhone { get; set; } = string.Empty;
        public string WebsiteUrl { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
#nullable restore

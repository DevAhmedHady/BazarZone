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
            FacebookUrl = string.Empty;
            InstagramUrl = string.Empty;
            TwitterUrl = string.Empty;
            LinkedInUrl = string.Empty;
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
        
        // Social Links
        public string FacebookUrl { get; set; } = string.Empty;
        public string InstagramUrl { get; set; } = string.Empty;
        public string TwitterUrl { get; set; } = string.Empty;
        public string LinkedInUrl { get; set; } = string.Empty;
    }
}
#nullable restore

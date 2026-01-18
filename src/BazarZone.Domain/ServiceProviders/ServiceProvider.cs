using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.ServiceProviders
{
    public class ServiceProvider : FullAuditedEntity<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? LogoUrl { get; set; }
        public string? ContactEmail { get; set; }
        public string? ContactPhone { get; set; }
        public string? WebsiteUrl { get; set; }
        public string? Address { get; set; }
        public string? Category { get; set; } // Simple category string as per "simple catalog" req, or could be relation later
        public bool IsActive { get; set; }
        
        // Social Links
        public string? FacebookUrl { get; set; }
        public string? InstagramUrl { get; set; }
        public string? TwitterUrl { get; set; }
        public string? LinkedInUrl { get; set; }

        public ServiceProvider()
        {
        }

        public ServiceProvider(Guid id, string name, string? description, string? logoUrl, string? contactEmail) : base(id)
        {
            Name = name;
            Description = description;
            LogoUrl = logoUrl;
            ContactEmail = contactEmail;
            IsActive = true;
        }
    }
}

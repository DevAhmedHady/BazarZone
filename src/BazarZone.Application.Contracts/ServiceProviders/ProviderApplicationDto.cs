using System;
#nullable disable
using Volo.Abp.Application.Dtos;

namespace BazarZone.ServiceProviders
{
    public class ProviderApplicationDto : EntityDto<Guid>
    {
        public ProviderApplicationDto()
        {
            CompanyName = string.Empty;
            ContactPerson = string.Empty;
            Email = string.Empty;
            PhoneNumber = string.Empty;
            BusinessDescription = string.Empty;
            WebsiteUrl = string.Empty;
            Address = string.Empty;
            Status = string.Empty;
        }

        public string CompanyName { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string BusinessDescription { get; set; } = string.Empty;
        public string WebsiteUrl { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty; // Using string for Enum in DTO usually, or use Enum
        public DateTime CreationTime { get; set; }
    }
}
#nullable restore

using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.ServiceProviders
{
    public class ProviderApplicationDto : EntityDto<Guid>
    {
        public string CompanyName { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string BusinessDescription { get; set; }
        public string WebsiteUrl { get; set; }
        public string Address { get; set; }
        public string Status { get; set; } // Using string for Enum in DTO usually, or use Enum
        public DateTime CreationTime { get; set; }
    }
}

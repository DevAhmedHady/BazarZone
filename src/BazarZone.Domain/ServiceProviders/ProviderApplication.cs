using System;
#nullable disable
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.ServiceProviders
{
    public class ProviderApplication : FullAuditedEntity<Guid>
    {
        public string CompanyName { get; set; } = string.Empty;
        public string ContactPerson { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string BusinessDescription { get; set; } = string.Empty;
        public string WebsiteUrl { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public ProviderApplicationStatus Status { get; set; }

        public ProviderApplication()
        {
            Status = ProviderApplicationStatus.Pending;
            WebsiteUrl = string.Empty;
            Address = string.Empty;
        }

        public ProviderApplication(Guid id, string companyName, string contactPerson, string email, string phoneNumber) : base(id)
        {
            CompanyName = companyName;
            ContactPerson = contactPerson;
            Email = email;
            PhoneNumber = phoneNumber;
            Status = ProviderApplicationStatus.Pending;
            WebsiteUrl = string.Empty;
            Address = string.Empty;
        }
    }
    
    public enum ProviderApplicationStatus
    {
        Pending,
        Approved,
        Rejected
    }
}
#nullable restore

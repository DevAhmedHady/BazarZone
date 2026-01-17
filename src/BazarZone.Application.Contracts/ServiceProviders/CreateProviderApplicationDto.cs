using System.ComponentModel.DataAnnotations;
#nullable disable

namespace BazarZone.ServiceProviders
{
    public class CreateProviderApplicationDto
    {
        public CreateProviderApplicationDto()
        {
            CompanyName = string.Empty;
            ContactPerson = string.Empty;
            Email = string.Empty;
            PhoneNumber = string.Empty;
            BusinessDescription = string.Empty;
            WebsiteUrl = string.Empty;
            Address = string.Empty;
        }

        [Required]
        [MaxLength(128)]
        public string CompanyName { get; set; } = string.Empty;

        [Required]
        [MaxLength(128)]
        public string ContactPerson { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(128)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(32)]
        public string PhoneNumber { get; set; } = string.Empty;
        
        public string BusinessDescription { get; set; } = string.Empty;
        public string WebsiteUrl { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
    }
}
#nullable restore

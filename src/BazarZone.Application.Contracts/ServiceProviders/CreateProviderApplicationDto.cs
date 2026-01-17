using System.ComponentModel.DataAnnotations;

namespace BazarZone.ServiceProviders
{
    public class CreateProviderApplicationDto
    {
        [Required]
        [MaxLength(128)]
        public string CompanyName { get; set; }

        [Required]
        [MaxLength(128)]
        public string ContactPerson { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(128)]
        public string Email { get; set; }

        [Required]
        [MaxLength(32)]
        public string PhoneNumber { get; set; }
        
        public string BusinessDescription { get; set; }
        public string WebsiteUrl { get; set; }
        public string Address { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace BazarZone.ServiceProviders
{
    public class CreateUpdateServiceProviderDto
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [StringLength(2048)]
        public string Description { get; set; }

        public string LogoUrl { get; set; }

        [EmailAddress]
        public string ContactEmail { get; set; }

        public string ContactPhone { get; set; }
        public string WebsiteUrl { get; set; }
        public string Address { get; set; }
        public string Category { get; set; }
        public bool IsActive { get; set; } = true;
    }
}

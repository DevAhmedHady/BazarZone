using System;
using System.ComponentModel.DataAnnotations;

namespace BazarZone.Products
{
    public class CreateUpdateProductDto
    {
        [Required]
        public Guid ServiceProviderId { get; set; }

        [Required]
        [StringLength(128)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? ImageUrl { get; set; }
        
        // Social Links
        public string? FacebookUrl { get; set; }
        public string? InstagramUrl { get; set; }
        public string? TwitterUrl { get; set; }
        public string? LinkedInUrl { get; set; }
    }
}

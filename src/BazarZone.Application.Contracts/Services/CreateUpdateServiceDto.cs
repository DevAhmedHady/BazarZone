using System;
using System.ComponentModel.DataAnnotations;

namespace BazarZone.Services
{
    public class CreateUpdateServiceDto
    {
        [Required]
        public Guid ServiceProviderId { get; set; }

        [Required]
        [StringLength(128)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? PriceUnit { get; set; }
    }
}

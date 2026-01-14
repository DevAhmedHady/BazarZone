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
        public string Name { get; set; }

        public string Description { get; set; }
        public decimal? Price { get; set; }
        public string ImageUrl { get; set; }
    }
}

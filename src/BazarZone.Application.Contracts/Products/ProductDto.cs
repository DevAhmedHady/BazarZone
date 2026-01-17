using System;
#nullable disable
using Volo.Abp.Application.Dtos;

namespace BazarZone.Products
{
    public class ProductDto : AuditedEntityDto<Guid>
    {
        public ProductDto()
        {
            Name = string.Empty;
            Description = string.Empty;
            ImageUrl = string.Empty;
        }

        public Guid ServiceProviderId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }
}
#nullable restore

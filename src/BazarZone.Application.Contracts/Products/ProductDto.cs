using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.Products
{
    public class ProductDto : AuditedEntityDto<Guid>
    {
        public Guid ServiceProviderId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        public string ImageUrl { get; set; }
    }
}

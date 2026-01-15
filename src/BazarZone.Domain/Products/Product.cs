using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Products
{
    public class Product : FullAuditedEntity<Guid>
    {
        public Guid ServiceProviderId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? ImageUrl { get; set; }

        public Product()
        {
        }

        public Product(Guid id, Guid serviceProviderId, string name, string? description, decimal? price, string? imageUrl) : base(id)
        {
            ServiceProviderId = serviceProviderId;
            Name = name;
            Description = description;
            Price = price;
            ImageUrl = imageUrl;
        }
    }
}

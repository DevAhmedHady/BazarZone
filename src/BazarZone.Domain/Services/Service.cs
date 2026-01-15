using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Services
{
    public class Service : FullAuditedEntity<Guid>
    {
        public Guid ServiceProviderId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? PriceUnit { get; set; } // e.g. "per hour", "per project"

        public Service()
        {
        }

        public Service(Guid id, Guid serviceProviderId, string name, string? description, decimal? price) : base(id)
        {
            ServiceProviderId = serviceProviderId;
            Name = name;
            Description = description;
            Price = price;
        }
    }
}

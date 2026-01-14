using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.Services
{
    public class ServiceDto : AuditedEntityDto<Guid>
    {
        public Guid ServiceProviderId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        public string PriceUnit { get; set; }
    }
}

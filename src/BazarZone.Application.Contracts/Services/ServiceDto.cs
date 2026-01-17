using System;
#nullable disable
using Volo.Abp.Application.Dtos;

namespace BazarZone.Services
{
    public class ServiceDto : AuditedEntityDto<Guid>
    {
        public ServiceDto()
        {
            Name = string.Empty;
            Description = string.Empty;
            PriceUnit = string.Empty;
        }

        public Guid ServiceProviderId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public string PriceUnit { get; set; } = string.Empty;
    }
}
#nullable restore

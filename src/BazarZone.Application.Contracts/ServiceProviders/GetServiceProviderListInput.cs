using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.ServiceProviders
{
    public class GetServiceProviderListInput : PagedAndSortedResultRequestDto
    {
        public string? Filter { get; set; }
        public string? Category { get; set; }
    }
}

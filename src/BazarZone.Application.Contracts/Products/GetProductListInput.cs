using System;
using System.ComponentModel.DataAnnotations;
using Volo.Abp.Application.Dtos;

namespace BazarZone.Products
{
    public class GetProductListInput : ISortedResultRequest, IPagedResultRequest
    {
        public string? Filter { get; set; }
        public Guid? ServiceProviderId { get; set; }

        public string? Sorting { get; set; }

        public int SkipCount { get; set; }

        [Range(1, int.MaxValue)]
        public int MaxResultCount { get; set; } = 1000;
    }
}

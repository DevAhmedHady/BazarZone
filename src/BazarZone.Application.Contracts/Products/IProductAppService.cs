using System;
using Volo.Abp.Application.Services;

namespace BazarZone.Products
{
    public interface IProductAppService : ICrudAppService<ProductDto, Guid, Volo.Abp.Application.Dtos.PagedAndSortedResultRequestDto, CreateUpdateProductDto>
    {
    }
}

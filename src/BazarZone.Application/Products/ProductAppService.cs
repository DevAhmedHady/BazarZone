using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.Products
{
    public class ProductAppService : CrudAppService<Product, ProductDto, Guid, GetProductListInput, CreateUpdateProductDto>, IProductAppService
    {
        public ProductAppService(IRepository<Product, Guid> repository) : base(repository)
        {
        }

        protected override async Task<IQueryable<Product>> CreateFilteredQueryAsync(GetProductListInput input)
        {
            return (await base.CreateFilteredQueryAsync(input))
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), x => x.Name.Contains(input.Filter!))
                .WhereIf(input.ServiceProviderId.HasValue, x => x.ServiceProviderId == input.ServiceProviderId!.Value);
        }

        [AllowAnonymous]
        public override Task<PagedResultDto<ProductDto>> GetListAsync(GetProductListInput input)
        {
            return base.GetListAsync(input);
        }

        [AllowAnonymous]
        public override Task<ProductDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }
    }
}

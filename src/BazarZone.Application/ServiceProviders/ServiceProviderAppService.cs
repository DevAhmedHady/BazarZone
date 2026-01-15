using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.ServiceProviders
{
    public class ServiceProviderAppService : CrudAppService<ServiceProvider, ServiceProviderDto, Guid, GetServiceProviderListInput, CreateUpdateServiceProviderDto>, IServiceProviderAppService
    {
        public ServiceProviderAppService(IRepository<ServiceProvider, Guid> repository) : base(repository)
        {
        }

        protected override async Task<IQueryable<ServiceProvider>> CreateFilteredQueryAsync(GetServiceProviderListInput input)
        {
            return (await base.CreateFilteredQueryAsync(input))
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), x => x.Name.Contains(input.Filter!))
                .WhereIf(!string.IsNullOrWhiteSpace(input.Category), x => x.Category == input.Category);
        }

        [AllowAnonymous]
        public override Task<PagedResultDto<ServiceProviderDto>> GetListAsync(GetServiceProviderListInput input)
        {
            return base.GetListAsync(input);
        }

        [AllowAnonymous]
        public override Task<ServiceProviderDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }

        [AllowAnonymous]
        public async Task<System.Collections.Generic.List<string>> GetCategoriesAsync()
        {
            var query = await Repository.GetQueryableAsync();
            var categories = query.Select(x => x.Category)
                     .Where(x => !string.IsNullOrEmpty(x))
                     .Distinct();
            
            return await AsyncExecuter.ToListAsync(categories);
        }
    }
}

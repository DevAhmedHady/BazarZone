using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.ServiceProviders
{
    public class ServiceProviderAppService : CrudAppService<ServiceProvider, ServiceProviderDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateServiceProviderDto>, IServiceProviderAppService
    {
        public ServiceProviderAppService(IRepository<ServiceProvider, Guid> repository) : base(repository)
        {
        }

        [AllowAnonymous]
        public override Task<PagedResultDto<ServiceProviderDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }

        [AllowAnonymous]
        public override Task<ServiceProviderDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }
    }
}

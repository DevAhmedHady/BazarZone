using System;
using Volo.Abp.Application.Services;

namespace BazarZone.ServiceProviders
{
    public interface IServiceProviderAppService : ICrudAppService<ServiceProviderDto, Guid, Volo.Abp.Application.Dtos.PagedAndSortedResultRequestDto, CreateUpdateServiceProviderDto>
    {
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BazarZone.ServiceProviders
{
    public interface IServiceProviderAppService : ICrudAppService<ServiceProviderDto, Guid, GetServiceProviderListInput, CreateUpdateServiceProviderDto>
    {
        Task<List<string>> GetCategoriesAsync();
    }
}

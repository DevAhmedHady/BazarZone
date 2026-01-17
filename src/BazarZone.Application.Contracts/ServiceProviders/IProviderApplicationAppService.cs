using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BazarZone.ServiceProviders
{
    public interface IProviderApplicationAppService : ICrudAppService<ProviderApplicationDto, Guid, PagedAndSortedResultRequestDto, CreateProviderApplicationDto, CreateProviderApplicationDto>
    {
    }
}

using System;
using Volo.Abp.Application.Services;

namespace BazarZone.Services
{
    public interface IServiceAppService : ICrudAppService<ServiceDto, Guid, Volo.Abp.Application.Dtos.PagedAndSortedResultRequestDto, CreateUpdateServiceDto>
    {
    }
}

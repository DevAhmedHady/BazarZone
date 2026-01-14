using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.Services
{
    public class ServiceAppService : CrudAppService<Service, ServiceDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateServiceDto>, IServiceAppService
    {
        public ServiceAppService(IRepository<Service, Guid> repository) : base(repository)
        {
        }

        [AllowAnonymous]
        public override Task<PagedResultDto<ServiceDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }

        [AllowAnonymous]
        public override Task<ServiceDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }
    }
}

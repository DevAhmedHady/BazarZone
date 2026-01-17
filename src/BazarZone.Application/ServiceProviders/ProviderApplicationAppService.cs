using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.ServiceProviders
{
    [RemoteService]
    [Route("api/app/provider-application")]
    public class ProviderApplicationAppService : CrudAppService<ProviderApplication, ProviderApplicationDto, Guid, PagedAndSortedResultRequestDto, CreateProviderApplicationDto, CreateProviderApplicationDto>, IProviderApplicationAppService
    {
        private readonly IRepository<ServiceProvider, Guid> _providerRepository;

        public ProviderApplicationAppService(
            IRepository<ProviderApplication, Guid> repository,
            IRepository<ServiceProvider, Guid> providerRepository) : base(repository)
        {
            _providerRepository = providerRepository;
        }

        [AllowAnonymous]
        [HttpPost]
        public override Task<ProviderApplicationDto> CreateAsync(CreateProviderApplicationDto input)
        {
            return base.CreateAsync(input);
        }

        [HttpGet]
        public override Task<PagedResultDto<ProviderApplicationDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }

        [HttpGet("{id}")]
        public override Task<ProviderApplicationDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }

        [HttpDelete("{id}")]
        public override Task DeleteAsync(Guid id)
        {
            return base.DeleteAsync(id);
        }

        [HttpPut("{id}/status")]
        public async Task<ProviderApplicationDto> UpdateStatusAsync(Guid id, [FromBody] UpdateProviderApplicationStatusDto input)
        {
            var application = await Repository.GetAsync(id);
            application.Status = input.Status;
            await Repository.UpdateAsync(application);

            // If approved, create a new ServiceProvider
            if (input.Status == ProviderApplicationStatus.Approved)
            {
                var provider = new ServiceProvider(
                    GuidGenerator.Create(),
                    application.CompanyName,
                    application.BusinessDescription,
                    null, // LogoUrl
                    application.Email
                )
                {
                    ContactPhone = application.PhoneNumber,
                    WebsiteUrl = application.WebsiteUrl,
                    Address = application.Address,
                    IsActive = true
                };
                await _providerRepository.InsertAsync(provider);
            }

            return ObjectMapper.Map<ProviderApplication, ProviderApplicationDto>(application);
        }
    }

    public class UpdateProviderApplicationStatusDto
    {
        public ProviderApplicationStatus Status { get; set; }
    }
}



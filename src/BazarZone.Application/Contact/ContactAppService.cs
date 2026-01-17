using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;


namespace BazarZone.Contact
{
    [RemoteService]
    [Route("api/app/contact")]
    public class ContactAppService : CrudAppService<ContactRequest, ContactRequestDto, Guid, PagedAndSortedResultRequestDto, CreateContactRequestDto, CreateContactRequestDto>, IContactAppService
    {
        public ContactAppService(IRepository<ContactRequest, Guid> repository) : base(repository)
        {
        }

        [AllowAnonymous]
        [HttpPost]
        public override Task<ContactRequestDto> CreateAsync(CreateContactRequestDto input)
        {
            return base.CreateAsync(input);
        }

        [HttpGet]
        public override Task<PagedResultDto<ContactRequestDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }

        [HttpGet("{id}")]
        public override Task<ContactRequestDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }

        [HttpDelete("{id}")]
        public override Task DeleteAsync(Guid id)
        {
            return base.DeleteAsync(id);
        }
    }
}


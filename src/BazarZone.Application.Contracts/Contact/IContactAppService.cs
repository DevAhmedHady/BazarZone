using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BazarZone.Contact
{
    public interface IContactAppService : ICrudAppService<ContactRequestDto, Guid, PagedAndSortedResultRequestDto, CreateContactRequestDto, CreateContactRequestDto>
    {
    }
}

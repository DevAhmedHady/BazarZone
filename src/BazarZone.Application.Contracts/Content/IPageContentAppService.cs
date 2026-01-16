using System;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BazarZone.Content
{
    public interface IPageContentAppService : ICrudAppService<PageContentDto, Guid, PagedAndSortedResultRequestDto, CreateUpdatePageContentDto>
    {
        Task<string?> GetContentAsync(string key);
        Task<Dictionary<string, string>> GetSectionContentAsync(string section);
    }
}

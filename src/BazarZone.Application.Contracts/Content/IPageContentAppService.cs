using System;
using Volo.Abp.Application.Services;

namespace BazarZone.Content
{
    public interface IPageContentAppService : ICrudAppService<PageContentDto, Guid, Volo.Abp.Application.Dtos.PagedAndSortedResultRequestDto, CreateUpdatePageContentDto>
    {
        System.Threading.Tasks.Task<string> GetContentAsync(string key);
    }
}

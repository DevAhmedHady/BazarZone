using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.Content
{
    public class PageContentAppService : CrudAppService<PageContent, PageContentDto, Guid, PagedAndSortedResultRequestDto, CreateUpdatePageContentDto>, IPageContentAppService
    {
        public PageContentAppService(IRepository<PageContent, Guid> repository) : base(repository)
        {
        }

        [AllowAnonymous]
        public override Task<PagedResultDto<PageContentDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }

        [AllowAnonymous]
        public override Task<PageContentDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }

        [AllowAnonymous]
        public async Task<string?> GetContentAsync(string key)
        {
            var content = await Repository.FirstOrDefaultAsync(x => x.Key == key);
            return content?.Value;
        }
    }
}

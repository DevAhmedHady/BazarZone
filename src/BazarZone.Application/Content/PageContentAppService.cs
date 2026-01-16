using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

using Volo.Abp;
namespace BazarZone.Content
{
    [RemoteService]
    [Route("api/app/page-content")]
    public class PageContentAppService : CrudAppService<PageContent, PageContentDto, Guid, PagedAndSortedResultRequestDto, CreateUpdatePageContentDto>, IPageContentAppService
    {
        public PageContentAppService(IRepository<PageContent, Guid> repository) : base(repository)
        {
        }

        [AllowAnonymous]
        [HttpGet]
        public override Task<PagedResultDto<PageContentDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public override Task<PageContentDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }

        [HttpPost]
        public override Task<PageContentDto> CreateAsync(CreateUpdatePageContentDto input)
        {
            return base.CreateAsync(input);
        }

        [HttpPut("{id}")]
        public override Task<PageContentDto> UpdateAsync(Guid id, CreateUpdatePageContentDto input)
        {
            return base.UpdateAsync(id, input);
        }

        [HttpDelete("{id}")]
        public override Task DeleteAsync(Guid id)
        {
            return base.DeleteAsync(id);
        }

        [AllowAnonymous]
        [HttpGet("content/{key}")]
        public async Task<string?> GetContentAsync(string key)
        {
            var content = await Repository.FirstOrDefaultAsync(x => x.Key == key);
            return content?.Value;
        }

        [AllowAnonymous]
        [HttpGet("section/{section}")]
        public async Task<Dictionary<string, string>> GetSectionContentAsync(string section)
        {
            var contents = await Repository.GetListAsync(x => x.Section == section);
            return contents.ToDictionary(x => x.Key, x => x.Value);
        }
    }
}

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

namespace BazarZone.Sliders
{
    [RemoteService]
    [Route("api/app/slider-banner")]
    public class SliderBannerAppService : CrudAppService<SliderBanner, SliderBannerDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateSliderBannerDto>, ISliderBannerAppService
    {
        public SliderBannerAppService(IRepository<SliderBanner, Guid> repository) : base(repository)
        {
        }

        [AllowAnonymous]
        [HttpGet]
        public override Task<PagedResultDto<SliderBannerDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            return base.GetListAsync(input);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public override Task<SliderBannerDto> GetAsync(Guid id)
        {
            return base.GetAsync(id);
        }

        [HttpPost]
        public override Task<SliderBannerDto> CreateAsync(CreateUpdateSliderBannerDto input)
        {
            return base.CreateAsync(input);
        }

        [HttpPut("{id}")]
        public override Task<SliderBannerDto> UpdateAsync(Guid id, CreateUpdateSliderBannerDto input)
        {
            return base.UpdateAsync(id, input);
        }

        [HttpDelete("{id}")]
        public override Task DeleteAsync(Guid id)
        {
            return base.DeleteAsync(id);
        }

        [AllowAnonymous]
        [HttpGet("active/{position}")]
        public async Task<List<SliderBannerDto>> GetActiveByPositionAsync(SliderPosition position)
        {
            var now = DateTime.UtcNow;
            var banners = await Repository.GetListAsync(x =>
                x.Position == position &&
                x.IsVisible &&
                (!x.StartDate.HasValue || x.StartDate <= now) &&
                (!x.EndDate.HasValue || x.EndDate >= now)
            );

            var sortedBanners = banners.OrderBy(x => x.SortOrder).ToList();
            return ObjectMapper.Map<List<SliderBanner>, List<SliderBannerDto>>(sortedBanners);
        }
    }
}

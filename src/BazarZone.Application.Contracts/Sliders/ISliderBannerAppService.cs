using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace BazarZone.Sliders
{
    public interface ISliderBannerAppService : ICrudAppService<SliderBannerDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateSliderBannerDto>
    {
        Task<List<SliderBannerDto>> GetActiveByPositionAsync(SliderPosition position);
    }
}

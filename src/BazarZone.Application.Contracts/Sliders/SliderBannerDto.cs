using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.Sliders
{
    public class SliderBannerDto : FullAuditedEntityDto<Guid>
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? LinkUrl { get; set; }
        public SliderPosition Position { get; set; }
        public int SortOrder { get; set; }
        public bool IsVisible { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}

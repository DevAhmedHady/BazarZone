using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Sliders
{
    public class SliderBanner : FullAuditedEntity<Guid>
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

        public SliderBanner()
        {
        }

        public SliderBanner(Guid id, string title, string imageUrl, SliderPosition position, int sortOrder = 0) : base(id)
        {
            Title = title;
            ImageUrl = imageUrl;
            Position = position;
            SortOrder = sortOrder;
            IsVisible = true;
        }
    }
}

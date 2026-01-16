using System;
using System.ComponentModel.DataAnnotations;

namespace BazarZone.Sliders
{
    public class CreateUpdateSliderBannerDto
    {
        [Required]
        [StringLength(128)]
        public string Title { get; set; } = string.Empty;

        [StringLength(512)]
        public string? Description { get; set; }

        [Required]
        [StringLength(1024)]
        public string ImageUrl { get; set; } = string.Empty;

        [StringLength(1024)]
        public string? LinkUrl { get; set; }

        public SliderPosition Position { get; set; }

        public int SortOrder { get; set; }

        public bool IsVisible { get; set; } = true;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}

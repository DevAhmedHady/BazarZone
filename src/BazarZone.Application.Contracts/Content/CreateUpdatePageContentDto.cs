using System.ComponentModel.DataAnnotations;

namespace BazarZone.Content
{
    public class CreateUpdatePageContentDto
    {
        [Required]
        [StringLength(64)]
        public string Key { get; set; } = string.Empty;

        public string Value { get; set; } = string.Empty;

        public string Section { get; set; } = string.Empty;

        public PageContentType Type { get; set; }
    }
}

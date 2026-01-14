using System.ComponentModel.DataAnnotations;

namespace BazarZone.Content
{
    public class CreateUpdatePageContentDto
    {
        [Required]
        [StringLength(64)]
        public string Key { get; set; }

        public string Value { get; set; }

        public string Section { get; set; }

        public PageContentType Type { get; set; }
    }
}

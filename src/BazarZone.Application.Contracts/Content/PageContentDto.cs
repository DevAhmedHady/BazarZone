using System;
#nullable disable
using Volo.Abp.Application.Dtos;

namespace BazarZone.Content
{
    public class PageContentDto : AuditedEntityDto<Guid>
    {
        public PageContentDto()
        {
            Key = string.Empty;
            Value = string.Empty;
            Section = string.Empty;
        }

        public string Key { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Section { get; set; } = string.Empty;
        public PageContentType Type { get; set; }
    }
}
#nullable restore

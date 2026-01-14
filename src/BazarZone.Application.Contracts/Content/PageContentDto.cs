using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.Content
{
    public class PageContentDto : AuditedEntityDto<Guid>
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Section { get; set; }
        public PageContentType Type { get; set; }
    }
}

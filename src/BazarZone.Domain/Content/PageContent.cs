using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Content
{
    public class PageContent : AuditedEntity<Guid>
    {
        public string Key { get; set; } // Unique Key e.g. "Home_Hero_Title"
        public string Value { get; set; }
        public string Section { get; set; } // e.g. "Home", "Footer"
        public PageContentType Type { get; set; }

        public PageContent()
        {
            Key = string.Empty;
            Value = string.Empty;
            Section = string.Empty;
        }

        public PageContent(Guid id, string key, string value, string section, PageContentType type) : base(id)
        {
            Key = key;
            Value = value;
            Section = section;
            Type = type;
        }
    }

}

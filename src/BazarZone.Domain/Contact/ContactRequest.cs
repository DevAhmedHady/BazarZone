using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Contact
{
    public class ContactRequest : FullAuditedEntity<Guid>
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsProcessed { get; set; }

        public ContactRequest() { }

        public ContactRequest(Guid id, string name, string email, string subject, string message) : base(id)
        {
            Name = name;
            Email = email;
            Subject = subject;
            Message = message;
            IsProcessed = false;
        }
    }
}

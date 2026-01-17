using System;
#nullable disable
using Volo.Abp.Application.Dtos;

namespace BazarZone.Contact
{
    public class ContactRequestDto : EntityDto<Guid>
    {
        public ContactRequestDto()
        {
            Name = string.Empty;
            Email = string.Empty;
            Subject = string.Empty;
            Message = string.Empty;
        }

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsProcessed { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
#nullable restore

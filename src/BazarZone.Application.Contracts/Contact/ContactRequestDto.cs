using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.Contact
{
    public class ContactRequestDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public bool IsProcessed { get; set; }
        public DateTime CreationTime { get; set; }
    }
}

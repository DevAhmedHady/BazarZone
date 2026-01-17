using System.ComponentModel.DataAnnotations;
#nullable disable

namespace BazarZone.Contact
{
    public class CreateContactRequestDto
    {
        public CreateContactRequestDto()
        {
            Name = string.Empty;
            Email = string.Empty;
            Subject = string.Empty;
            Message = string.Empty;
        }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(128)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(256)]
        public string Subject { get; set; } = string.Empty;

        [Required]
        [MaxLength(2048)]
        public string Message { get; set; } = string.Empty;
    }
}
#nullable restore

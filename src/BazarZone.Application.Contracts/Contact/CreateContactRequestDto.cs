using System.ComponentModel.DataAnnotations;

namespace BazarZone.Contact
{
    public class CreateContactRequestDto
    {
        [Required]
        [MaxLength(128)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(128)]
        public string Email { get; set; }

        [Required]
        [MaxLength(256)]
        public string Subject { get; set; }

        [Required]
        [MaxLength(2048)]
        public string Message { get; set; }
    }
}

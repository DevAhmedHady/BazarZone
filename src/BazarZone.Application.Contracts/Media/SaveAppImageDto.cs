using System;
#nullable disable

namespace BazarZone.Media;

public class SaveAppImageDto
{
    public SaveAppImageDto()
    {
        FileName = string.Empty;
        MimeType = string.Empty;
        Content = Array.Empty<byte>();
    }

    public string FileName { get; set; } = string.Empty;
    public string MimeType { get; set; } = string.Empty;
    public byte[] Content { get; set; } = Array.Empty<byte>();
    public string ReferenceId { get; set; } = string.Empty;
    public string ReferenceType { get; set; } = string.Empty;
}
#nullable restore

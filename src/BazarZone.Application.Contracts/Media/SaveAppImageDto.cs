namespace BazarZone.Media;

public class SaveAppImageDto
{
    public string FileName { get; set; }
    public string MimeType { get; set; }
    public byte[] Content { get; set; }
    public string? ReferenceId { get; set; }
    public string? ReferenceType { get; set; }
}

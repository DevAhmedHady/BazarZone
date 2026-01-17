using System;
#nullable disable
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Media;

public class AppImage : FullAuditedAggregateRoot<Guid>
{
    public string FileName { get; set; } = string.Empty;
    public string MimeType { get; set; } = string.Empty;
    public long Size { get; set; }
    public byte[] Content { get; set; } = Array.Empty<byte>();
    
    public string ReferenceId { get; set; } = string.Empty;
    public string ReferenceType { get; set; } = string.Empty;

    protected AppImage()
    {
        FileName = string.Empty;
        MimeType = string.Empty;
        Content = Array.Empty<byte>();
    }

    public AppImage(Guid id, string fileName, string mimeType, long size, byte[] content, string referenceId = "", string referenceType = "")
        : base(id)
    {
        FileName = fileName;
        MimeType = mimeType;
        Size = size;
        Content = content;
        ReferenceId = referenceId;
        ReferenceType = referenceType;
    }
}
#nullable restore

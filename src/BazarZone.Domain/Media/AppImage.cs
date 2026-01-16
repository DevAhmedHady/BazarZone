using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace BazarZone.Media;

public class AppImage : FullAuditedAggregateRoot<Guid>
{
    public string FileName { get; set; }
    public string MimeType { get; set; }
    public long Size { get; set; }
    public byte[] Content { get; set; }
    
    public string? ReferenceId { get; set; }
    public string? ReferenceType { get; set; }

    protected AppImage()
    {
    }

    public AppImage(Guid id, string fileName, string mimeType, long size, byte[] content, string? referenceId = null, string? referenceType = null)
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

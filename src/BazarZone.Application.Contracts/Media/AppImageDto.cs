using System;
#nullable disable
using Volo.Abp.Application.Dtos;

namespace BazarZone.Media;

public class AppImageDto : EntityDto<Guid>
{
    public AppImageDto()
    {
        FileName = string.Empty;
        MimeType = string.Empty;
    }

    public string FileName { get; set; } = string.Empty;
    public string MimeType { get; set; } = string.Empty;
    public long Size { get; set; }
}
#nullable restore

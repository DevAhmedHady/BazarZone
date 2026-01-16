using System;
using Volo.Abp.Application.Dtos;

namespace BazarZone.Media;

public class AppImageDto : EntityDto<Guid>
{
    public string FileName { get; set; }
    public string MimeType { get; set; }
    public long Size { get; set; }
}

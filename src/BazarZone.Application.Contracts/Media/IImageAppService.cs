using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace BazarZone.Media;

public interface IImageAppService : IApplicationService
{
    Task<AppImageDto> UploadAsync(SaveAppImageDto input);
    Task<byte[]> GetContentAsync(Guid id);
    Task<AppImageDto> GetAsync(Guid id);
}

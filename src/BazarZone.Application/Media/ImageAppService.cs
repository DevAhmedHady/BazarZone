using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace BazarZone.Media;

public class ImageAppService : ApplicationService, IImageAppService
{
    private readonly IRepository<AppImage, Guid> _imageRepository;

    public ImageAppService(IRepository<AppImage, Guid> imageRepository)
    {
        _imageRepository = imageRepository;
    }

    public async Task<AppImageDto> UploadAsync(SaveAppImageDto input)
    {
        var image = new AppImage(
            GuidGenerator.Create(),
            input.FileName,
            input.MimeType,
            input.Content.Length,
            input.Content,
            input.ReferenceId,
            input.ReferenceType
        );

        await _imageRepository.InsertAsync(image);

        return ObjectMapper.Map<AppImage, AppImageDto>(image);
    }

    public async Task<byte[]> GetContentAsync(Guid id)
    {
        var image = await _imageRepository.GetAsync(id);
        return image.Content;
    }

    public async Task<AppImageDto> GetAsync(Guid id)
    {
        var image = await _imageRepository.GetAsync(id);
        return ObjectMapper.Map<AppImage, AppImageDto>(image);
    }
}

using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.AspNetCore.Mvc;

namespace BazarZone.Media;

[RemoteService]
[Route("api/app/images")]
public class ImageController : AbpController
{
    private readonly IImageAppService _imageAppService;

    public ImageController(IImageAppService imageAppService)
    {
        _imageAppService = imageAppService;
    }

    [HttpPost]
    [Route("upload")]
    public async Task<AppImageDto> UploadAsync(IFormFile file, string? referenceType = null, string? referenceId = null)
    {
        if (file == null || file.Length == 0)
        {
            throw new UserFriendlyException("File is empty!");
        }

        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);

        var saveDto = new SaveAppImageDto
        {
            FileName = file.FileName,
            MimeType = file.ContentType,
            Content = memoryStream.ToArray(),
            ReferenceType = referenceType,
            ReferenceId = referenceId
        };

        return await _imageAppService.UploadAsync(saveDto);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetAsync(Guid id)
    {
        var imageDto = await _imageAppService.GetAsync(id);
        var content = await _imageAppService.GetContentAsync(id);

        return File(content, imageDto.MimeType, imageDto.FileName);
    }
}

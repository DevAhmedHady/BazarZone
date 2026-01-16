using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;
using BazarZone.ServiceProviders;
using BazarZone.Services;
using BazarZone.Products;
using BazarZone.Content;

namespace BazarZone;

// ServiceProvider mappers
[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class ServiceProviderToServiceProviderDtoMapper : MapperBase<ServiceProvider, ServiceProviderDto>
{
    public override partial ServiceProviderDto Map(ServiceProvider source);
    public override partial void Map(ServiceProvider source, ServiceProviderDto destination);
}

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class CreateUpdateServiceProviderDtoToServiceProviderMapper : MapperBase<CreateUpdateServiceProviderDto, ServiceProvider>
{
    public override partial ServiceProvider Map(CreateUpdateServiceProviderDto source);
    public override partial void Map(CreateUpdateServiceProviderDto source, ServiceProvider destination);
}

// Service mappers
[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class ServiceToServiceDtoMapper : MapperBase<Service, ServiceDto>
{
    public override partial ServiceDto Map(Service source);
    public override partial void Map(Service source, ServiceDto destination);
}

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class CreateUpdateServiceDtoToServiceMapper : MapperBase<CreateUpdateServiceDto, Service>
{
    public override partial Service Map(CreateUpdateServiceDto source);
    public override partial void Map(CreateUpdateServiceDto source, Service destination);
}

// Product mappers
[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class ProductToProductDtoMapper : MapperBase<Product, ProductDto>
{
    public override partial ProductDto Map(Product source);
    public override partial void Map(Product source, ProductDto destination);
}

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class CreateUpdateProductDtoToProductMapper : MapperBase<CreateUpdateProductDto, Product>
{
    public override partial Product Map(CreateUpdateProductDto source);
    public override partial void Map(CreateUpdateProductDto source, Product destination);
}

// PageContent mappers
[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class PageContentToPageContentDtoMapper : MapperBase<PageContent, PageContentDto>
{
    public override partial PageContentDto Map(PageContent source);
    public override partial void Map(PageContent source, PageContentDto destination);
}

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class CreateUpdatePageContentDtoToPageContentMapper : MapperBase<CreateUpdatePageContentDto, PageContent>
{
    public override partial PageContent Map(CreateUpdatePageContentDto source);
    public override partial void Map(CreateUpdatePageContentDto source, PageContent destination);
}

// SliderBanner mappers
[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class SliderBannerToSliderBannerDtoMapper : MapperBase<Sliders.SliderBanner, Sliders.SliderBannerDto>
{
    public override partial Sliders.SliderBannerDto Map(Sliders.SliderBanner source);
    public override partial void Map(Sliders.SliderBanner source, Sliders.SliderBannerDto destination);
}

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class CreateUpdateSliderBannerDtoToSliderBannerMapper : MapperBase<Sliders.CreateUpdateSliderBannerDto, Sliders.SliderBanner>
{
    public override partial Sliders.SliderBanner Map(Sliders.CreateUpdateSliderBannerDto source);
    public override partial void Map(Sliders.CreateUpdateSliderBannerDto source, Sliders.SliderBanner destination);
}

// AppImage mappers
[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class AppImageToAppImageDtoMapper : MapperBase<Media.AppImage, Media.AppImageDto>
{
    public override partial Media.AppImageDto Map(Media.AppImage source);
    public override partial void Map(Media.AppImage source, Media.AppImageDto destination);
}


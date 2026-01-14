using Riok.Mapperly.Abstractions;
using Volo.Abp.Mapperly;
using BazarZone.ServiceProviders;
using BazarZone.Services;
using BazarZone.Products;
using BazarZone.Content;

namespace BazarZone;

[Mapper(RequiredMappingStrategy = RequiredMappingStrategy.None)]
public partial class BazarZoneApplicationMappers
{
    // ServiceProvider
    public partial ServiceProviderDto Map(ServiceProvider source);
    public partial ServiceProvider Map(CreateUpdateServiceProviderDto source);
    public partial void Map(CreateUpdateServiceProviderDto source, ServiceProvider destination);

    // Service
    public partial ServiceDto Map(Service source);
    public partial Service Map(CreateUpdateServiceDto source);
    public partial void Map(CreateUpdateServiceDto source, Service destination);

    // Product
    public partial ProductDto Map(Product source);
    public partial Product Map(CreateUpdateProductDto source);
    public partial void Map(CreateUpdateProductDto source, Product destination);

    // PageContent
    public partial PageContentDto Map(PageContent source);
    public partial PageContent Map(CreateUpdatePageContentDto source);
    public partial void Map(CreateUpdatePageContentDto source, PageContent destination);
}

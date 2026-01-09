using Volo.Abp.Modularity;

namespace BazarZone;

[DependsOn(
    typeof(BazarZoneApplicationModule),
    typeof(BazarZoneDomainTestModule)
)]
public class BazarZoneApplicationTestModule : AbpModule
{

}

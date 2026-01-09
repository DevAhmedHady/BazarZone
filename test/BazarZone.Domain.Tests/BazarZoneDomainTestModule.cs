using Volo.Abp.Modularity;

namespace BazarZone;

[DependsOn(
    typeof(BazarZoneDomainModule),
    typeof(BazarZoneTestBaseModule)
)]
public class BazarZoneDomainTestModule : AbpModule
{

}

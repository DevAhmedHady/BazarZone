using BazarZone.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace BazarZone.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(BazarZoneEntityFrameworkCoreModule),
    typeof(BazarZoneApplicationContractsModule)
)]
public class BazarZoneDbMigratorModule : AbpModule
{
}

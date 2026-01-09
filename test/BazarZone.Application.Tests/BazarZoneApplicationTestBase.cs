using Volo.Abp.Modularity;

namespace BazarZone;

public abstract class BazarZoneApplicationTestBase<TStartupModule> : BazarZoneTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}

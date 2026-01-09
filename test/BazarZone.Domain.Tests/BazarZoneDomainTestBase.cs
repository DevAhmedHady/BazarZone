using Volo.Abp.Modularity;

namespace BazarZone;

/* Inherit from this class for your domain layer tests. */
public abstract class BazarZoneDomainTestBase<TStartupModule> : BazarZoneTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}

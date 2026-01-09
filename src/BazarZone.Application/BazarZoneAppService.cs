using BazarZone.Localization;
using Volo.Abp.Application.Services;

namespace BazarZone;

/* Inherit your application services from this class.
 */
public abstract class BazarZoneAppService : ApplicationService
{
    protected BazarZoneAppService()
    {
        LocalizationResource = typeof(BazarZoneResource);
    }
}

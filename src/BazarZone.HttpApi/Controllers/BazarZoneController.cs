using BazarZone.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace BazarZone.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class BazarZoneController : AbpControllerBase
{
    protected BazarZoneController()
    {
        LocalizationResource = typeof(BazarZoneResource);
    }
}

using BazarZone.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace BazarZone.Web.Pages;

public abstract class BazarZonePageModel : AbpPageModel
{
    protected BazarZonePageModel()
    {
        LocalizationResourceType = typeof(BazarZoneResource);
    }
}

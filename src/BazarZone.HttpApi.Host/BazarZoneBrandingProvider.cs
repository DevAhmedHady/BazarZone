using Microsoft.Extensions.Localization;
using BazarZone.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace BazarZone;

[Dependency(ReplaceServices = true)]
public class BazarZoneBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<BazarZoneResource> _localizer;

    public BazarZoneBrandingProvider(IStringLocalizer<BazarZoneResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}

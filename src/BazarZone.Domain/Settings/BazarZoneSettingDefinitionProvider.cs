using Volo.Abp.Settings;

namespace BazarZone.Settings;

public class BazarZoneSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(BazarZoneSettings.MySetting1));
    }
}

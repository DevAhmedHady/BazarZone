#nullable disable

using Volo.Abp.Settings;

namespace BazarZone.Dashboard
{
    public class DashboardSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            context.Add(
                new SettingDefinition(
                    DashboardSettingNames.VisitorCountMode,
                    VisitorCountMode.Hits.ToString()
                ),
                new SettingDefinition(
                    DashboardSettingNames.PeriodDays,
                    "30"
                )
            );
        }
    }
}

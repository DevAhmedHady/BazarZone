using BazarZone.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;
using Volo.Abp.MultiTenancy;

namespace BazarZone.Permissions;

public class BazarZonePermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(BazarZonePermissions.GroupName);

        //Define your own permissions here. Example:
        //myGroup.AddPermission(BazarZonePermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<BazarZoneResource>(name);
    }
}

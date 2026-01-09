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

        var booksPermission = myGroup.AddPermission(BazarZonePermissions.Books.Default, L("Permission:Books"));
        booksPermission.AddChild(BazarZonePermissions.Books.Create, L("Permission:Books.Create"));
        booksPermission.AddChild(BazarZonePermissions.Books.Edit, L("Permission:Books.Edit"));
        booksPermission.AddChild(BazarZonePermissions.Books.Delete, L("Permission:Books.Delete"));
        //Define your own permissions here. Example:
        //myGroup.AddPermission(BazarZonePermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<BazarZoneResource>(name);
    }
}

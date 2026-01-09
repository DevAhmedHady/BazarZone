using Xunit;

namespace BazarZone.EntityFrameworkCore;

[CollectionDefinition(BazarZoneTestConsts.CollectionDefinitionName)]
public class BazarZoneEntityFrameworkCoreCollection : ICollectionFixture<BazarZoneEntityFrameworkCoreFixture>
{

}

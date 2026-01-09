using BazarZone.Samples;
using Xunit;

namespace BazarZone.EntityFrameworkCore.Applications;

[Collection(BazarZoneTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<BazarZoneEntityFrameworkCoreTestModule>
{

}

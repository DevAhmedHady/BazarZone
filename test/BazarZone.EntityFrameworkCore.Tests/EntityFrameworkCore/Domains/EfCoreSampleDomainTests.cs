using BazarZone.Samples;
using Xunit;

namespace BazarZone.EntityFrameworkCore.Domains;

[Collection(BazarZoneTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<BazarZoneEntityFrameworkCoreTestModule>
{

}

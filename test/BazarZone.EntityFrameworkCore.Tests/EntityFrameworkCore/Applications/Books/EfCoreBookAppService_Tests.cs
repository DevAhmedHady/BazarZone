using BazarZone.Books;
using Xunit;

namespace BazarZone.EntityFrameworkCore.Applications.Books;

[Collection(BazarZoneTestConsts.CollectionDefinitionName)]
public class EfCoreBookAppService_Tests : BookAppService_Tests<BazarZoneEntityFrameworkCoreTestModule>
{

}
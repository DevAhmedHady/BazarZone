using Microsoft.AspNetCore.Builder;
using BazarZone;
using Volo.Abp.AspNetCore.TestBase;

var builder = WebApplication.CreateBuilder();
builder.Environment.ContentRootPath = GetWebProjectContentRootPathHelper.Get("BazarZone.Web.csproj"); 
await builder.RunAbpModuleAsync<BazarZoneWebTestModule>(applicationName: "BazarZone.Web");

public partial class Program
{
}

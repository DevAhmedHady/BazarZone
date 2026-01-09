using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace BazarZone.Data;

/* This is used if database provider does't define
 * IBazarZoneDbSchemaMigrator implementation.
 */
public class NullBazarZoneDbSchemaMigrator : IBazarZoneDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}

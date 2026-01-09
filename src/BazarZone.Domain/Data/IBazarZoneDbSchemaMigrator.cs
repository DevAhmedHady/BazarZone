using System.Threading.Tasks;

namespace BazarZone.Data;

public interface IBazarZoneDbSchemaMigrator
{
    Task MigrateAsync();
}

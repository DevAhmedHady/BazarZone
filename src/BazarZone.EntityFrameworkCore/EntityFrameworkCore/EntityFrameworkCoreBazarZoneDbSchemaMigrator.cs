using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BazarZone.Data;
using Volo.Abp.DependencyInjection;

namespace BazarZone.EntityFrameworkCore;

public class EntityFrameworkCoreBazarZoneDbSchemaMigrator
    : IBazarZoneDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreBazarZoneDbSchemaMigrator(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolving the BazarZoneDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<BazarZoneDbContext>()
            .Database
            .MigrateAsync();
    }
}

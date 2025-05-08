using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CodePermisTracker.Infrastructure.Data;

public class PermisTrackerDbContextFactory : IDesignTimeDbContextFactory<PermisTrackerDbContext>
{
    public PermisTrackerDbContext CreateDbContext(string[] args)
    {
        var config = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../CodePermisTracker.Server"))
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<PermisTrackerDbContext>();
        optionsBuilder.UseSqlServer(config.GetConnectionString("DefaultConnection"));

        return new PermisTrackerDbContext(optionsBuilder.Options);
    }
}

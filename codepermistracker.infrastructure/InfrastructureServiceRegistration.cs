using CodePermisTracker.Application.Interfaces;
using CodePermisTracker.Infrastructure.Data;
using CodePermisTracker.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CodePermisTracker.Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<PermisTrackerDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IDrivingActionRepository, DrivingActionRepository>();
        services.AddScoped<ICodeTaskRepository, CodeTaskRepository>();
        services.AddScoped<IAdminTaskRepository, AdminTaskRepository>();

        return services;
    }
}

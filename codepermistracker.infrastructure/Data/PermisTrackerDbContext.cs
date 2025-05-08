using CodePermisTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CodePermisTracker.Infrastructure.Data;

public class PermisTrackerDbContext : DbContext
{
    public PermisTrackerDbContext(DbContextOptions<PermisTrackerDbContext> options)
        : base(options) { }

    public DbSet<AdminTask> AdminTasks => Set<AdminTask>();
    public DbSet<DrivingAction> DrivingActions => Set<DrivingAction>();
    public DbSet<CodeTask> CodeTasks => Set<CodeTask>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurer l'enum DrivingStatus comme string
        modelBuilder.Entity<DrivingAction>()
            .Property(d => d.Status)
            .HasConversion<string>();

        // Index facultatif pour les labels si besoin
        modelBuilder.Entity<AdminTask>().HasIndex(t => t.Label).IsUnique(false);
        modelBuilder.Entity<CodeTask>().HasIndex(t => t.Label).IsUnique(false);
        modelBuilder.Entity<DrivingAction>().HasIndex(t => t.Label).IsUnique(false);
    }
}

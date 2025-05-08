using CodePermisTracker.Application.Interfaces;
using CodePermisTracker.Domain.Entities;
using CodePermisTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodePermisTracker.Infrastructure.Repositories;

public class AdminTaskRepository : IAdminTaskRepository
{
    private readonly PermisTrackerDbContext _context;

    public AdminTaskRepository(PermisTrackerDbContext context)
    {
        _context = context;
    }

    public async Task<List<AdminTask>> GetAllAsync()
    {
        return await _context.AdminTasks.ToListAsync();
    }

    public async Task<AdminTask?> FindByLabelAsync(string label)
    {
        return await _context.AdminTasks.FirstOrDefaultAsync(t => t.Label == label);
    }

    public async Task<AdminTask> AddAsync(AdminTask task)
    {
        _context.AdminTasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task UpdateAsync(AdminTask task)
    {
        _context.Entry(task).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.AdminTasks.FindAsync(id);
        if (entity != null)
        {
            _context.AdminTasks.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}

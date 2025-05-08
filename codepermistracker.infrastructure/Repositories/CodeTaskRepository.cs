using CodePermisTracker.Application.Interfaces;
using CodePermisTracker.Domain.Entities;
using CodePermisTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodePermisTracker.Infrastructure.Repositories;

public class CodeTaskRepository : ICodeTaskRepository
{
    private readonly PermisTrackerDbContext _context;

    public CodeTaskRepository(PermisTrackerDbContext context)
    {
        _context = context;
    }

    public async Task<List<CodeTask>> GetAllAsync()
    {
        return await _context.CodeTasks.ToListAsync();
    }

    public async Task<CodeTask?> FindByLabelAsync(string label)
    {
        return await _context.CodeTasks.FirstOrDefaultAsync(t => t.Label == label);
    }

    public async Task<CodeTask> AddAsync(CodeTask task)
    {
        _context.CodeTasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task UpdateAsync(CodeTask task)
    {
        _context.Entry(task).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.CodeTasks.FindAsync(id);
        if (entity != null)
        {
            _context.CodeTasks.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}

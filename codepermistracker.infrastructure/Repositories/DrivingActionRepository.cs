using CodePermisTracker.Application.Interfaces;
using CodePermisTracker.Domain.Entities;
using CodePermisTracker.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CodePermisTracker.Infrastructure.Repositories;

public class DrivingActionRepository : IDrivingActionRepository
{
    private readonly PermisTrackerDbContext _context;

    public DrivingActionRepository(PermisTrackerDbContext context)
    {
        _context = context;
    }

    public async Task<List<DrivingAction>> GetAllAsync()
    {
        return await _context.DrivingActions.ToListAsync();
    }

    public async Task<DrivingAction?> FindByLabelAsync(string label)
    {
        return await _context.DrivingActions.FirstOrDefaultAsync(a => a.Label == label);
    }

    public async Task<DrivingAction> AddAsync(DrivingAction action)
    {
        _context.DrivingActions.Add(action);
        await _context.SaveChangesAsync();
        return action;
    }

    public async Task UpdateAsync(DrivingAction action)
    {
        _context.Entry(action).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.DrivingActions.FindAsync(id);
        if (entity != null)
        {
            _context.DrivingActions.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}

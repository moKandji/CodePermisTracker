using CodePermisTracker.Domain.Entities;

namespace CodePermisTracker.Application.Interfaces;

public interface IDrivingActionRepository
{
    Task<List<DrivingAction>> GetAllAsync();
    Task<DrivingAction?> FindByLabelAsync(string label);
    Task<DrivingAction> AddAsync(DrivingAction action);
    Task UpdateAsync(DrivingAction action);
    Task DeleteAsync(int id);
}
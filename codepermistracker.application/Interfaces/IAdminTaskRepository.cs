using CodePermisTracker.Domain.Entities;

namespace CodePermisTracker.Application.Interfaces;

public interface IAdminTaskRepository
{
    Task<List<AdminTask>> GetAllAsync();
    Task<AdminTask?> FindByLabelAsync(string label);
    Task<AdminTask> AddAsync(AdminTask task);
    Task UpdateAsync(AdminTask task);
    Task DeleteAsync(int id);
}
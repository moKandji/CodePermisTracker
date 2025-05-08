using CodePermisTracker.Domain.Entities;

namespace CodePermisTracker.Application.Interfaces;

public interface ICodeTaskRepository
{
    Task<List<CodeTask>> GetAllAsync();
    Task<CodeTask?> FindByLabelAsync(string label);
    Task<CodeTask> AddAsync(CodeTask task);
    Task UpdateAsync(CodeTask task);
    Task DeleteAsync(int id);
}
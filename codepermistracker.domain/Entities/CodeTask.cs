using codepermistracker.domain.Enums;

namespace CodePermisTracker.Domain.Entities;

public class CodeTask
{
    public int Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DrivingStatus Status { get; set; } = DrivingStatus.NonCommence;
}

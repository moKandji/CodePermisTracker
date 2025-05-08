namespace CodePermisTracker.Domain.Entities;

public class AdminTask
{
    public int Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public bool Completed { get; set; }
}

namespace CodePermisTracker.Application.DTOs;

public class AdminTaskDto
{
    public int Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public bool Completed { get; set; } = false;
}
namespace CodePermisTracker.Application.DTOs;

public class DrivingActionDto
{
    public int Id { get; set; }
    public string Label { get; set; } = string.Empty;
    public DateTime? Date { get; set; }
    public string Status { get; set; } = "NotStarted";
}
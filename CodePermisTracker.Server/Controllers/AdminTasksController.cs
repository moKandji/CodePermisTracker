using CodePermisTracker.Application.Interfaces;
using CodePermisTracker.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CodePermisTracker.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminTasksController : ControllerBase
{
    private readonly IAdminTaskRepository _repo;

    public AdminTasksController(IAdminTaskRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<AdminTask>>> GetAll()
    {
        return Ok(await _repo.GetAllAsync());
    }

    [HttpGet("find")]
    public async Task<ActionResult<AdminTask>> FindByLabel([FromQuery] string label)
    {
        var task = await _repo.FindByLabelAsync(label);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<AdminTask>> Create([FromBody] AdminTask task)
    {
        var created = await _repo.AddAsync(task);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] AdminTask task)
    {
        if (id != task.Id) return BadRequest();
        await _repo.UpdateAsync(task);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }
}
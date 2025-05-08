using CodePermisTracker.Application.Interfaces;
using CodePermisTracker.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CodePermisTracker.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DrivingActionsController : ControllerBase
{
    private readonly IDrivingActionRepository _repo;
    public DrivingActionsController(IDrivingActionRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<DrivingAction>>> GetAll()
    {
        return Ok(await _repo.GetAllAsync());
    }

    [HttpGet("find")]
    public async Task<ActionResult<DrivingAction>> FindByLabel([FromQuery] string label)
    {
        var result = await _repo.FindByLabelAsync(label);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<DrivingAction>> Create(DrivingAction action)
    {
        var created = await _repo.AddAsync(action);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, DrivingAction action)
    {
        if (id != action.Id) return BadRequest();
        await _repo.UpdateAsync(action);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }
}
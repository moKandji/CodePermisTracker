using CodePermisTracker.Application.Interfaces;
using CodePermisTracker.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace CodePermisTracker.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CodeTasksController : ControllerBase
{
    private readonly ICodeTaskRepository _repo;

    public CodeTasksController(ICodeTaskRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<CodeTask>>> GetAll()
    {
        return Ok(await _repo.GetAllAsync());
    }

    [HttpGet("find")]
    public async Task<ActionResult<CodeTask>> FindByLabel([FromQuery] string label)
    {
        var result = await _repo.FindByLabelAsync(label);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<CodeTask>> Create(CodeTask task)
    {
        var created = await _repo.AddAsync(task);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CodeTask task)
    {
        if (id != task.Id) return BadRequest();
        await _repo.UpdateAsync(task);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _repo.DeleteAsync(id);
        return NoContent();
    }
}
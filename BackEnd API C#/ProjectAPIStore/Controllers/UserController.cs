using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectAPIStore.Data;    
using ProjectAPIStore.Models;  

namespace ProjectAPIStore.Controllers;

[ApiController]
[Route("api/usuarios")] // GET /api/usuarios/by-code?codigo=103
public class UsuariosController : ControllerBase
{
    private readonly TestDgadbContext _context;

    public UsuariosController(TestDgadbContext context)
    {
        _context = context;
    }

    // GET api/usuarios/by-code?codigo=103
    [HttpGet("by-code")]
    public async Task<ActionResult<User>> GetUsuarioByCode([FromQuery] int codigo)
    {
        var usuario = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Codigo == codigo);

        if (usuario == null)
            return NotFound("Usuario no encontrado");

        return Ok(usuario);
    }
}

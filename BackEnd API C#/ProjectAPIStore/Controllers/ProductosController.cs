using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectAPIStore.Models;
using ProjectAPIStore.Data;

namespace ProjectAPIStore.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SolicitudesController : ControllerBase
  {
    private readonly TestDgadbContext _context;

    public SolicitudesController(TestDgadbContext context)
    {
      _context = context;
    }

    // GET api/solicitudes/listed
    [HttpGet("listed")]
    public async Task<ActionResult<List<Solicitud>>> GetSolicitudes()
    {
      var solicitudes = await _context.Solicitudes.ToListAsync();
      return Ok(solicitudes);
    }

    // GET api/solicitudes/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Solicitud>> GetSolicitud(int id)
    {
      var solicitud = await _context.Solicitudes.FindAsync(id);
      if (solicitud == null)
        return NotFound();

      return Ok(solicitud);
    }
  }
}

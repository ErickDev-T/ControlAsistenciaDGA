using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectAPIStore.Models;
using ProjectAPIStore.Data;
using ProjectAPIStore.Models.Dtos;

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

    // GET trae todos las solicitudes
    [HttpGet("listed")]
    public async Task<ActionResult<List<Solicitud>>> GetSolicitudes()
    {
      var solicitudes = await _context.Solicitudes.ToListAsync();
      return Ok(solicitudes);
    }

    // DELETE api/solicitudes/5 elimina por ID
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteSolicitud(int id)
    {
        var solicitud = await _context.Solicitudes.FindAsync(id);
        if (solicitud == null)
            return NotFound();

        _context.Solicitudes.Remove(solicitud);
        await _context.SaveChangesAsync();

        return NoContent(); // 204
    }


        // GET api/solicitudes/5  Trae solicitud por ID
        [HttpGet("{id:int}")]
    public async Task<ActionResult<Solicitud>> GetSolicitud(int id)
    {
      var solicitud = await _context.Solicitudes.FindAsync(id);
      if (solicitud == null)
        return NotFound();

      return Ok(solicitud);
    }



        [HttpPost("from-code")]
        public async Task<ActionResult<Solicitud>> CreateFromCode([FromBody] CreateSolicitudFromCodeDto dto)
        {
            // 1) Buscar persona por código
            var persona = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Codigo == dto.Code);

            if (persona is null)
                return NotFound("Usuario/Persona no encontrado");

            // 2) Validación de tiempos
            if (dto.ExitDate.HasValue && dto.ExitTime.HasValue)
            {
                var entrada = dto.EntryDate.Date + dto.EntryTime;
                var salida = dto.ExitDate.Value.Date + dto.ExitTime.Value;
                if (salida < entrada) return BadRequest("La salida no puede ser anterior a la entrada.");
            }

            // construir la entidad con PersonaId
            var solicitud = new Solicitud
            {
                PersonaId = persona.Id,             
                Codigo = persona.Codigo,                
                NombreApellido = persona.NombreApellido,

                FechaEntrada = dto.EntryDate.Date,
                HoraEntrada = dto.EntryTime,
                FechaSalida = dto.ExitDate?.Date,
                HoraSalida = dto.ExitTime,
                UrlDocumento = dto.DocumentUrl,
                DocumentoTipo = dto.DocumentType
            };

            _context.Solicitudes.Add(solicitud);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSolicitud), new { id = solicitud.Id }, solicitud);
        }






    }
}   

using Microsoft.AspNetCore.Mvc;
using ProjectAPIStore.Data;   // <-- tu namespace del DbContext
using ProjectAPIStore.Models; // <-- tu namespace de modelos

[Route("api/[controller]")]
[ApiController]
public class UploadsController : ControllerBase
{
  private readonly IWebHostEnvironment _env;
  private readonly TestDgadbContext _db;

  public UploadsController(IWebHostEnvironment env, TestDgadbContext db)
  {
    _env = env;
    _db = db;
  }

  // POST /api/uploads/123 
  [HttpPost("{codigo:int}")]
  public async Task<IActionResult> Upload(int codigo, IFormFile file)
  {
    if (file == null || file.Length == 0)
      return BadRequest("Archivo vacío.");

    //  buscar la solicitud
    var solicitud = await _db.Solicitudes.FindAsync(codigo);
    if (solicitud == null)
      return NotFound($"No existe la solicitud con código {codigo}.");

    // asegurar carpeta
    var uploadsPath = Path.Combine(_env.WebRootPath, "uploads");
    Directory.CreateDirectory(uploadsPath);

    // guardar archivo físicamente
    var safeName = Path.GetFileName(file.FileName);
    var fileName = $"{Guid.NewGuid()}_{safeName}";
    var filePath = Path.Combine(uploadsPath, fileName);

    await using (var stream = new FileStream(filePath, FileMode.Create))
      await file.CopyToAsync(stream);

    // armar URL pública
    var fileUrl = $"{Request.Scheme}://{Request.Host}/uploads/{fileName}";

    // guardar URL y tipo en la BD
    solicitud.UrlDocumento = fileUrl;
    solicitud.DocumentoTipo = file.ContentType; // ej: image/png, application/pdf
    await _db.SaveChangesAsync();

    // 6) Responder
    return Ok(new { url = fileUrl, tipo = solicitud.DocumentoTipo });
  }
}

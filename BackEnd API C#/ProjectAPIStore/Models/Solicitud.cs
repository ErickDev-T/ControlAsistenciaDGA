using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectAPIStore.Models;

[Table("Solicitudes")]
public class Solicitud
{
    public int Id { get; set; }

    public int PersonaId { get; set; }
    public User Persona { get; set; } = null!; 

    public int Codigo { get; set; }
    public string NombreApellido { get; set; } = "";

    public TimeSpan HoraEntrada { get; set; }
    public DateTime FechaEntrada { get; set; }
    public DateTime? FechaSalida { get; set; }
    public TimeSpan? HoraSalida { get; set; }

    public string? UrlDocumento { get; set; }
    public string? DocumentoTipo { get; set; }
}


// ProjectAPIStore/Models/Solicitud.cs
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectAPIStore.Models;

[Table("Solicitudes")]
public class Solicitud
{
  [Key] public int Codigo { get; set; }

  [Required, StringLength(150)]
  public string NombreApellido { get; set; } = string.Empty;

  [Required] public TimeSpan HoraEntrada { get; set; }
  [Required] public DateTime FechaEntrada { get; set; }

  public DateTime? FechaSalida { get; set; }
  public TimeSpan? HoraSalida { get; set; }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectAPIStore.Models;

[Table("Personas")]   // 👈 aquí va Personas
public class User
{
    [Key]
    public int Id { get; set; }

    public int Codigo { get; set; }

    public string NombreApellido { get; set; } = string.Empty;
}

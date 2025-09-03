// Models/Dtos/CreateSolicitudFromCodeDto.cs
namespace ProjectAPIStore.Models.Dtos
{
    public class CreateSolicitudFromCodeDto
    {
        public int Code { get; set; }

        public DateTime EntryDate { get; set; }
        public DateTime? ExitDate { get; set; }

        public TimeSpan EntryTime { get; set; }
        public TimeSpan? ExitTime { get; set; }

        public string? DocumentUrl { get; set; }
        public string? DocumentType { get; set; }
    }
}

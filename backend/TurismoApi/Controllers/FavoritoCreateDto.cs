namespace TurismoApi.Models
{
    public class FavoritoCreateDto
    {
        public int UserId { get; set; }
        public int? PontoTuristicoId { get; set; }
        public int? ExperienciaLocalId { get; set; }
    }
}


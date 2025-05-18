namespace TurismoApi.Controllers
{
    public class FavoritoResponseDto
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public int? PontoTuristicoId { get; set; }
        public int? ExperienciaLocalId { get; set; }
    }

}

namespace TurismoApi.Models
{
    public class Favorito
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int? PontoTuristicoId { get; set; }
        public PontoTuristico? PontoTuristico { get; set; }

        public int? ExperienciaLocalId { get; set; }
        public ExperienciaLocal? ExperienciaLocal { get; set; }
    }
}

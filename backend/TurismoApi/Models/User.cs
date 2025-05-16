namespace TurismoApi.Models
{
    public class User
    {
        public int Id { get; set; } // O EF Core vai gerar o Id automaticamente
        public string Name { get; set; } = string.Empty;  // Nome do usuário
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

}



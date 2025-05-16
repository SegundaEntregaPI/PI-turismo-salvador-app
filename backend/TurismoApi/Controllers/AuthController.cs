using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurismoApi.Data;
using TurismoApi.Models;

namespace TurismoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            Console.WriteLine("Método Login chamado");

            var foundUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email && u.Password == user.Password);

            if (foundUser == null)
            {
                return Unauthorized("Email ou senha inválidos");
            }

            return Ok("Login realizado com sucesso");
        }

        // CADASTRO
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            Console.WriteLine("Método Register chamado");

            // Verificar se o usuário já existe
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser != null)
            {
                return BadRequest("Este e-mail já está cadastrado");
            }          

            // Adicionar o usuário no banco de dados
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Cadastro realizado com sucesso");
        }
    }
}

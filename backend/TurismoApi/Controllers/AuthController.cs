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

            return Ok(new
            {
                message = "Login realizado com sucesso",
                userId = foundUser.Id
            });
        }

        // CADASTRO
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            Console.WriteLine("Método Register chamado");

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser != null)
            {
                return BadRequest("Este e-mail já está cadastrado");
            }          

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Cadastro realizado com sucesso");
        }
    }
}

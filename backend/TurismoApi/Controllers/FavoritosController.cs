using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurismoApi.Data;
using TurismoApi.Models;

namespace TurismoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FavoritosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Favoritos/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<FavoritoResponseDto>>> GetFavoritosPorUsuario(int userId)
        {
            var favoritos = await _context.Favoritos
                .Include(f => f.PontoTuristico)
                .Include(f => f.ExperienciaLocal)
                .Where(f => f.UserId == userId)
                .ToListAsync();

            var resultado = favoritos.Select(f => new FavoritoResponseDto
            {
                Id = f.Id,
                Tipo = f.PontoTuristico != null ? "PontoTuristico" : "ExperienciaLocal",
                Nome = f.PontoTuristico?.Nome ?? f.ExperienciaLocal?.Nome ?? "",
                Descricao = f.PontoTuristico?.Descricao ?? f.ExperienciaLocal?.Descricao ?? "",
                PontoTuristicoId = f.PontoTuristicoId,
                ExperienciaLocalId = f.ExperienciaLocalId
            });

            return Ok(resultado);
        }

        // POST: api/Favoritos
        [HttpPost]
        public async Task<ActionResult> Favoritar([FromBody] FavoritoCreateDto dto)

        {
            var exists = await _context.Favoritos.AnyAsync(f =>
     f.UserId == dto.UserId &&
            ((dto.PontoTuristicoId != null && f.PontoTuristicoId == dto.PontoTuristicoId) ||
            (dto.ExperienciaLocalId != null && f.ExperienciaLocalId == dto.ExperienciaLocalId)));

            if (exists)
            {
                return BadRequest("Já favoritado.");
            }

            var favorito = new Favorito
            {
                UserId = dto.UserId,
                PontoTuristicoId = dto.PontoTuristicoId,
                ExperienciaLocalId = dto.ExperienciaLocalId
            };

            _context.Favoritos.Add(favorito);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Favoritos
        [HttpDelete]
        public async Task<IActionResult> DeleteFavorito([FromBody] FavoritoDeleteDto dto)
        {
            var favorito = await _context.Favoritos.FirstOrDefaultAsync(f =>
                f.UserId == dto.UserId &&
                ((dto.PontoTuristicoId != null && f.PontoTuristicoId == dto.PontoTuristicoId) ||
                 (dto.ExperienciaLocalId != null && f.ExperienciaLocalId == dto.ExperienciaLocalId)));

            if (favorito == null)
            {
                return NotFound("Favorito não encontrado.");
            }

            _context.Favoritos.Remove(favorito);
            await _context.SaveChangesAsync();

            return Ok("Favorito removido com sucesso.");
        }
    }
}


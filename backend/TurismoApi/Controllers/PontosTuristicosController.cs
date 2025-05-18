using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurismoApi.Data;
using TurismoApi.Models;

namespace TurismoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PontosTuristicosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PontosTuristicosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/PontosTuristicos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PontoTuristico>>> GetPontosTuristicos()
        {
            return await _context.PontosTuristicos.ToListAsync();
        }

        // GET: api/PontosTuristicos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PontoTuristico>> GetPontoTuristico(int id)
        {
            var ponto = await _context.PontosTuristicos.FindAsync(id);

            if (ponto == null)
            {
                return NotFound();
            }

            return ponto;
        }

        // POST: api/PontosTuristicos
        [HttpPost]
        public async Task<ActionResult<PontoTuristico>> PostPontoTuristico(PontoTuristico pontoTuristico)
        {
            _context.PontosTuristicos.Add(pontoTuristico);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPontoTuristico), new { id = pontoTuristico.Id }, pontoTuristico);
        }

        // PUT: api/PontosTuristicos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPontoTuristico(int id, PontoTuristico pontoTuristico)
        {
            if (id != pontoTuristico.Id)
            {
                return BadRequest();
            }

            _context.Entry(pontoTuristico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PontoTuristicoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/PontosTuristicos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePontoTuristico(int id)
        {
            var pontoTuristico = await _context.PontosTuristicos.FindAsync(id);
            if (pontoTuristico == null)
            {
                return NotFound();
            }

            _context.PontosTuristicos.Remove(pontoTuristico);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PontoTuristicoExists(int id)
        {
            return _context.PontosTuristicos.Any(e => e.Id == id);
        }
    }
}


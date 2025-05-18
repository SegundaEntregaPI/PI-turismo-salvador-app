using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurismoApi.Data;
using TurismoApi.Models;

namespace TurismoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienciasLocaisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExperienciasLocaisController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ExperienciasLocais
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExperienciaLocal>>> GetExperienciasLocais()
        {
            return await _context.ExperienciasLocais.ToListAsync();
        }

        // GET: api/ExperienciasLocais/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExperienciaLocal>> GetExperienciaLocal(int id)
        {
            var experiencia = await _context.ExperienciasLocais.FindAsync(id);

            if (experiencia == null)
            {
                return NotFound();
            }

            return experiencia;
        }

        // POST: api/ExperienciasLocais
        [HttpPost]
        public async Task<ActionResult<ExperienciaLocal>> PostExperienciaLocal(ExperienciaLocal experienciaLocal)
        {
            _context.ExperienciasLocais.Add(experienciaLocal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetExperienciaLocal), new { id = experienciaLocal.Id }, experienciaLocal);
        }

        // PUT: api/ExperienciasLocais/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExperienciaLocal(int id, ExperienciaLocal experienciaLocal)
        {
            if (id != experienciaLocal.Id)
            {
                return BadRequest();
            }

            _context.Entry(experienciaLocal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExperienciaLocalExists(id))
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

        // DELETE: api/ExperienciasLocais/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExperienciaLocal(int id)
        {
            var experienciaLocal = await _context.ExperienciasLocais.FindAsync(id);
            if (experienciaLocal == null)
            {
                return NotFound();
            }

            _context.ExperienciasLocais.Remove(experienciaLocal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExperienciaLocalExists(int id)
        {
            return _context.ExperienciasLocais.Any(e => e.Id == id);
        }
    }
}


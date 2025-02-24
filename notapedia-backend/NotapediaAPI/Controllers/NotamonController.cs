using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using NotapediaAPI.Models;

namespace NotapediaAPI.Controllers
{
    [Route("api/notamon")]
    [ApiController]
    public class NotamonController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotamonController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notamon>>> GetAllNotamon()
        {
            return await _context.Notamons.ToListAsync();
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<Notamon>> GetNotamonByName(string name)
        {
            var notamon = await _context.Notamons.FirstOrDefaultAsync(n => n.Name.ToLower() == name.ToLower());
            if (notamon == null) return NotFound();
            return notamon;
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using NotapediaAPI.Models;

namespace NotapediaAPI.Controllers
{
    [Route("api/typeeffectivenesses")]
    [ApiController]

    public class TypeEffectivenessesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TypeEffectivenessesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeEffectiveness>>> GetAllTypeEffectivenesses()
        {
            return await _context.TypeEffectivenesses.ToListAsync();
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using NotapediaAPI.Models;

namespace NotapediaAPI.Controllers
{
    [Route("api/keys")]
    [ApiController]
    public class KeysController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public KeysController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Key>>> GetAllKeys()
        {
            return await _context.Keys.ToListAsync();
        }
    }

}
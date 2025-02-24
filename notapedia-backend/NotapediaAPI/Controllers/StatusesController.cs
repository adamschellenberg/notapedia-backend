using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using NotapediaAPI.Models;

namespace NotapediaAPI.Controllers
{
    [Route("api/statuses")]
    [ApiController]
    public class StatusesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatusesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Status>>> GetAllStatuses()
        {
            return await _context.Statuses.ToListAsync();
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using NotapediaAPI.Models;

namespace NotapediaAPI.Controllers
{
    [Route("api/vaults")]
    [ApiController]

    public class VaultsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VaultsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vault>>> GetAllVaults()
        {
            return await _context.Vaults.ToListAsync();
        }
    }
}
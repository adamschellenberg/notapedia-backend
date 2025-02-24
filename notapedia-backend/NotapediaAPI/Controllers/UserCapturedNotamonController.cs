using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Data;
using NotapediaAPI.Models;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotapediaAPI.Controllers
{
    [Route("api/progress")]
    [ApiController]
    [Authorize]
    public class UserCapturedNotamonController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public UserCapturedNotamonController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetCapturedNotamon()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var capturedNotamonIds = await _context.UserCapturedNotamons
                .Where(u => u.UserId == userId)
                .Select(u => u.NotamonId)
                .ToListAsync();

            return Ok(capturedNotamonIds);
        }

        [HttpPost("{notamonId}")]
        public async Task<IActionResult> CapturedNotamon(int notamonId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            
            bool alreadyCaptured = await _context.UserCapturedNotamons
                .AnyAsync(u => u.UserId == userId && u.NotamonId == notamonId);

            if (!alreadyCaptured)
            {
                var newCapture = new UserCapturedNotamon
                {
                    UserId = userId,
                    NotamonId = notamonId,
                    CaptureDate = System.DateTime.UtcNow
                };

                _context.UserCapturedNotamons.Add(newCapture);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Notamon captured!" });
        }

        [HttpDelete("{notamonId}")]
        public async Task<IActionResult> ReleaseNotamon(int notamonId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var capturedNotamon = await _context.UserCapturedNotamons
                .FirstOrDefaultAsync(u => u.UserId == userId && u.NotamonId == notamonId);

            if (capturedNotamon == null)
                return NotFound(new { message = "Notamon not found in user's progress" });

            _context.UserCapturedNotamons.Remove(capturedNotamon);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Notamon released!" });
        }
        
    }
}
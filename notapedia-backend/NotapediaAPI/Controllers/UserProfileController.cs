using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotapediaAPI.Models;
using NotapediaAPI.Data;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Text;

namespace NotapediaAPI.Controllers
{
    [Route("api/profile")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _context;

        public UserProfileController(UserManager<User> userManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized (new { message = "User not found" });
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound (new { message = "User profile not found" });

            return Ok(new
            {
                user.Username,
                user.Email,
                user.ProfileImage
            });
        }

        [HttpPut("username")]
        public async Task<IActionResult> UpdateUsername([FromBody] UpdateUsernameRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { message = "User not found." });
            
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User profile not found." });

            user.Username = request.NewUsername;
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest(new { message = "Failed to update username.", errors = result.Errors });

            return Ok(new { message = "Username updated successfully!" });
        }

        [HttpPut("image")]
        public async Task<IActionResult> UpdateProfileImage([FromBody] UpdateProfileImageRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { message = "User not found." });

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User profile not found." });

            user.ProfileImage = request.NewProfileImage;
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
                return BadRequest(new { message = "Failed to update profile image.", errors = result.Errors});

            return Ok(new { message = "Profile image updated successfully!" });
        }

        [HttpGet("report")]
        public async Task<IActionResult> GenerateUserReport()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized(new { message = "User not found." });

            var user = await _context.Users
                .Include(u => u.CapturedNotamons)
                .ThenInclude(c => c.Notamon)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
                return NotFound(new { message = "User profile not found." });

            if (user.CapturedNotamons == null || !user.CapturedNotamons.Any())
                return BadRequest(new { message = "No captured Notamons to generate a report." });
            
            var reportBuilder = new StringBuilder();
            reportBuilder.AppendLine($"User Report for {user.Username}");
            reportBuilder.AppendLine($"Generated on: {System.DateTime.UtcNow}");
            reportBuilder.AppendLine("====================================");
            reportBuilder.AppendLine("Captured Notamon:");
            reportBuilder.AppendLine("------------------------------------");

            foreach (var captured in user.CapturedNotamons.OrderBy(c => c.CaptureDate))
            {
                reportBuilder.AppendLine($"{captured.Notamon.Number}. {captured.Notamon.Name} - Captured on: {captured.CaptureDate:MM-dd-yyyy hh:mm tt}");
            }

            var reportBytes = Encoding.UTF8.GetBytes(reportBuilder.ToString());
            var fileName = $"UserReport_{user.Username}_{System.DateTime.UtcNow:yyyyMMdd}.txt";

            return File(reportBytes, "text/plain", fileName);
        }

        [HttpGet("capturednotamons")]
        public async Task<IActionResult> GetCapturedNotamon()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var capturedNotamon = await _context.UserCapturedNotamons
                .Where(ucn => ucn.UserId == userId)
                .Join(
                    _context.Notamons,
                    ucn => ucn.NotamonId,
                    n => n.NotamonId,
                    (ucn, n) => new
                    {
                        n.Number,
                        n.Name,
                        n.Type,
                        ucn.CaptureDate
                    }
                )
                .ToListAsync();

            return Ok(capturedNotamon);
        }

        public class UpdateUsernameRequest
        {
            public string NewUsername { get; set; }
        }

        public class UpdateProfileImageRequest
        {
            public string NewProfileImage { get; set; }
        }
    }
}
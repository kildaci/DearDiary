using DearDiaryNew.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DearDiaryNew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DailyDiaryContext _context;

        public UserController(DailyDiaryContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // POST: api/User/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] User loginUser)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginUser.Username && u.PasswordHash == loginUser.PasswordHash);

            if (user == null)
                return Unauthorized("Kullanýcý adý veya þifre hatalý.");

            return Ok(user);
        }

        // POST: api/User/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User newUser)
        {
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok(newUser);
        }
    }
}

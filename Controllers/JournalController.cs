using DearDiaryNew.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DearDiaryNew.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalController : ControllerBase
    {
        private readonly DailyDiaryContext _context;

        // Dependency Injection ile DbContext'i al
        public JournalController(DailyDiaryContext context)
        {
            _context = context;
        }

        // POST: api/Journal
        // React'ten gelen yeni günlük kaydýný veritabanýna ekler
        [HttpPost]
        public async Task<IActionResult> CreateJournal([FromBody] Journal journalEntry)
        {
            // Kullanýcýnýn gerçekten var olup olmadýðýný kontrol edelim
            var userExists = await _context.Users.AnyAsync(u => u.Id == journalEntry.UserId);
            if (!userExists)
            {
                return BadRequest(new { Message = "Belirtilen kullanýcý (UserId) bulunamadý." });
            }

            // JournalDate ve CreatedAt gibi alanlarý sunucu tarafýnda ayarlayabiliriz.
            // Ancak, sizin React kodunuz zaten JournalDate'i gönderiyor.

            _context.Journals.Add(journalEntry);
            await _context.SaveChangesAsync();

            // Baþarýlý olursa 201 Created (Oluþturuldu) durum kodu ve oluþturulan nesneyi döndür.
            return CreatedAtAction(nameof(GetJournalById), new { id = journalEntry.Id }, journalEntry);
        }

        // GET: api/Journal/{id}
        // CreatedAtAction için gerekli olan bir Get metodu
        [HttpGet("{id}")]
        public async Task<ActionResult<Journal>> GetJournalById(int id)
        {
            var journal = await _context.Journals.FindAsync(id);

            if (journal == null)
            {
                return NotFound();
            }

            return journal;
        }
    }
}
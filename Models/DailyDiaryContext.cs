using Microsoft.EntityFrameworkCore;

namespace DearDiaryNew.Models
{
    public class DailyDiaryContext : DbContext
    {
        public DailyDiaryContext(DbContextOptions<DailyDiaryContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Journal> Journals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // USER Modelindeki ayar: CreatedAt alaný veritabaný tarafýndan oluþturulsun.
            // Bu, EF Core'un C# tarafýnda 0001 yýlý olan bir deðer göndermesini engeller.
            modelBuilder.Entity<User>()
                .Property(u => u.CreatedAt)
                .ValueGeneratedOnAdd();

            // Journal modelinde Content null atanabilir olarak ayarlandýysa
            // modelBuilder.Entity<Journal>()
            //     .Property(j => j.Content)
            //     .IsRequired(false);

            base.OnModelCreating(modelBuilder);

        }
    }
}

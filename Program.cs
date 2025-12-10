using DearDiaryNew.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder; // Gerekli deðil ama açýkça belirtmek iyi

var builder = WebApplication.CreateBuilder(args);

// =================================================================
// 1. SERVÝSLERÝN TANIMLANMASI (Add Services)
// =================================================================

// 1.1. DB Baðlantýsý (DailyDiaryContext)
builder.Services.AddDbContext<DailyDiaryContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 1.2. CORS Politikasý Tanýmlama
// "AllowReactApp" politikasýný tanýmlýyoruz, burada izin verilen kaynaklarý belirttik.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000") // Frontend'inizin çalýþtýðý adres
                        .AllowAnyHeader()
                        .AllowAnyMethod()); // GET, POST, vb. tüm metotlara izin ver
});

// 1.3. Controller Servisini Ekleme (API endpoint'leri için gerekli)
builder.Services.AddControllers();

// =================================================================
// 2. UYGULAMANIN OLUÞTURULMASI VE MÝDDLEWARE SÝRASI (Build & Use)
// =================================================================

var app = builder.Build();

// 2.1. Geliþtirme Ortamý Hata Sayfasý (Development Environment)
// Geliþtirme aþamasýnda detaylý hatalarý görmek için kullanýlýr.
if (app.Environment.IsDevelopment())
{
    // API'nin baþlangýcýnda kullandýðýnýz launchSettings.json ayarlarý buraya denk gelir.
}

// 2.2. Routing'i etkinleþtirme (Request'lerin nereye gideceðini belirler)
app.UseRouting();

// 2.3. CORS'u Kullanma
// CORS mutlaka UseRouting ve UseAuthorization arasýnda olmalýdýr.
app.UseCors("AllowReactApp");

// 2.4. Yetkilendirmeyi etkinleþtirme (Kimlik doðrulama/izinler için)
app.UseAuthorization();

// 2.5. Controller'larý eþleþtirme (API endpoint'lerini HTTP pipeline'ýna ekler)
app.MapControllers();

app.Run();
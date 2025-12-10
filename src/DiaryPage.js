import React, { useState } from "react";
import Lottie from "lottie-react";
import pandaAnimation from "./tinyaPanda.json";

// App.js'ten props olarak giriş yapmış kullanıcının ID'sini (userId) almalıdır.
export default function DiaryPage({ userId }) { 
  const [diaryText, setDiaryText] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const today = new Date().toLocaleDateString();
  
  // Sizin API'nizin Journal endpoint'i
  const API_URL = "http://localhost:5272/api/Journal"; // Lütfen Journal Controller'ınızın adını kontrol edin!

  console.log("DiaryPage'e Gelen Kullanıcı ID'si:", userId);

  const handleSave = async () => {
    // 1. Kullanıcı ID'si yoksa kaydetme (Gereklilik kontrolü)
    if (!userId) {
        alert("Günlük kaydı için lütfen önce giriş yapın.");
        return;
    }
    
    // 2. Günlük içeriği boşsa uyarı ver
    if (!diaryText.trim()) {
        alert("Günlük içeriği boş olamaz.");
        return;
    }

    try {
      // Gönderilecek Journal nesnesini oluştur
      const journalEntry = {
        // Journal modelinizdeki alan adlarını kullanın (PascalCase: UserId, Content)
        UserId: userId, 
        JournalDate: new Date().toISOString(), // SQL'e uygun tarih formatı
        Content: diaryText
      };
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(journalEntry)
      });

      if (response.ok) {
        // Başarılı olursa popup göster
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
        console.log("✅ Günlük başarıyla kaydedildi.");
        
        // setDiaryText(""); // İsteğe bağlı: Kaydedildikten sonra temizle
        
      } else {
        // Sunucudan gelen hata mesajını göster
        const errorText = await response.text();
        alert(`Günlük kaydı başarısız! Sunucu hatası: ${errorText}`);
        console.error("API Kayıt Hatası:", errorText);
      }
    } catch (error) {
      // Ağ veya CORS hatası
      alert("Sunucuya bağlanılamadı. API'nizin çalıştığından emin olun.");
      console.error("Fetch Hatası:", error);
    }
  };

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      padding: 30,
      background: "linear-gradient(135deg, #fceaff, #ffffff)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start"
    }}>
      {/* Sağ üst köşe tinyaPanda animasyonu (UYARILARIN SEBEBİ BURAYDI) */}
      <div style={{ position: "absolute", top: 20, right: 20, width: 350, height: 350 }}>
        <Lottie animationData={pandaAnimation} loop={true} />
      </div>

      {/* Başlık */}
      <h1 style={{
        fontFamily: "'Georgia', serif",
        fontSize: "4rem",
        background: "linear-gradient(90deg, #ff9bd6, #ff57b0)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "2px 2px 6px rgba(0,0,0,0.15)",
        marginBottom: 20,
        cursor: "default",
        transition: "transform 0.3s, text-shadow 0.3s"
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
        Dear Diary
      </h1>

      {/* Tarih (UYARILARIN SEBEBİ BURAYDI) */}
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: 20 }}>{today}</p>

      {/* Kareli textarea */}
      <textarea
        value={diaryText}
        onChange={(e) => setDiaryText(e.target.value)}
        placeholder="Günün nasıl geçti? Dilediğin gibi yaz..."
        style={{
          width: "80%",
          flexGrow: 1,
          padding: 20,
          borderRadius: 10,
          border: "2px solid #ff9bd6",
          backgroundColor: "#fffbe6",
          backgroundImage: "linear-gradient(to right, #e0e0e0 1px, transparent 1px), linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          fontSize: "1.1rem",
          fontFamily: "'Cursive', sans-serif",
          resize: "none",
          outline: "none",
          marginBottom: 30
        }}
      />

      {/* Kaydet butonu */}
      <button
        onClick={handleSave} // API çağrısını yapan fonksiyon
        style={{
          padding: "12px 30px",
          borderRadius: 20,
          border: "none",
          background: "#ff9bd6",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
          alignSelf: "center",
          marginTop: "auto"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Kaydet
      </button>

      {/* Popup mesaj (UYARILARIN SEBEBİ BURAYDI) */}
      {showSaved && (
        <div style={{
          position: "fixed",
          bottom: 50,
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #ff9bd6, #ff57b0)",
          color: "#fff",
          padding: "15px 30px",
          borderRadius: 50,
          fontFamily: "'Cursive', sans-serif",
          fontSize: "1.2rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          animation: "popUp 0.5s ease forwards"
        }}>
          🌸 Günlük kaydedildi! 🌸
        </div>
      )}

      {/* Animasyon keyframes */}
      <style>
        {`
          @keyframes popUp {
            0% { transform: translate(-50%, 50px) scale(0.8); opacity: 0; }
            60% { transform: translate(-50%, -10px) scale(1.05); opacity: 1; }
            100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
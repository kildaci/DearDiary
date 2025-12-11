import React, { useState } from "react";
import Lottie from "lottie-react";
import pandaAnimation from "./tinyaPanda.json";

export default function DiaryPage({ userId }) { 
  const [diaryText, setDiaryText] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [diaries, setDiaries] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const today = new Date().toLocaleDateString();
  const API_URL = "http://localhost:5272/api/Journal";

  const handleSave = async () => {
    if (!userId) return alert("Günlük kaydı için lütfen önce giriş yapın.");
    if (!diaryText.trim()) return alert("Günlük içeriği boş olamaz.");

    try {
      const journalEntry = {
        UserId: userId, 
        JournalDate: new Date().toISOString(),
        Content: diaryText
      };
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journalEntry)
      });

      if (response.ok) {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
        setDiaryText(""); // opsiyonel: kaydettikten sonra temizle
      } else {
        const errorText = await response.text();
        alert(`Günlük kaydı başarısız! Sunucu hatası: ${errorText}`);
      }
    } catch (error) {
      alert("Sunucuya bağlanılamadı. API'nizin çalıştığından emin olun.");
      console.error("Fetch Hatası:", error);
    }
  };

  const toggleHistory = async () => {
    if (!showHistory) {
      try {
        const res = await fetch(`${API_URL}/User/${userId}`);
        if (!res.ok) {
          if (res.status === 404) {
            setDiaries([]);
            setShowHistory(true);
            return;
          }
          throw new Error("Geçmiş günlükler alınamadı.");
        }
        const data = await res.json();
        setDiaries(data);
      } catch (err) {
        alert(err.message);
      }
    }
    setShowHistory(prev => !prev);
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
      {/* Panda animasyonu */}
      <div style={{ position: "absolute", top: 20, right: 20, width: 350, height: 350 }}>
        <Lottie animationData={pandaAnimation} loop={true} />
      </div>

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

      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: 20 }}>{today}</p>

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
          marginBottom: 20
        }}
      />

      <button
        onClick={handleSave}
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
          marginBottom: 20
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Kaydet
      </button>

      <button
        onClick={toggleHistory}
        style={{
          padding: "10px 25px",
          borderRadius: 20,
          border: "none",
          background: "#7b61ff",
          color: "#fff",
          cursor: "pointer",
          marginBottom: 20
        }}
      >
        {showHistory ? "Geçmişi Kapat" : "Geçmiş Günlüklerim"}
      </button>

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

      {showHistory && (
        <div style={{ width: "80%", maxHeight: "400px", overflowY: "auto" }}>
          {diaries.length === 0 && <p>Henüz geçmiş günlük yok.</p>}
          {diaries.map(d => (
            <div key={d.id} style={{
              background: "#f5f2ff",
              margin: "10px 0",
              padding: 15,
              borderRadius: 10
            }}>
              <strong>{new Date(d.journalDate).toLocaleDateString()}</strong>
              <p>{d.content}</p>
            </div>
          ))}
        </div>
      )}

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

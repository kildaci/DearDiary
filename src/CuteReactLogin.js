import React, { useState } from "react";
import Lottie from "lottie-react";
import bunnyAnimation from "./Cute Shy Bunny.json";

// API'ye POST isteği gönderme fonksiyonu artık handleLoginOrRegister içinde
export default function CuteReactLogin({ onLogin, isRegistering, toggleRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Hata mesajı için state
  
  // Sizin API'nizin temel adresi
  const API_BASE_URL = "http://localhost:5272/api/User";

  const handleLoginOrRegister = async () => {
    setError(null); // Önceki hataları temizle
    
    // İşlem tipine göre URL belirleme
    const endpoint = isRegistering ? "/Register" : "/Login";
    
    try {
      const response = await fetch(API_BASE_URL + endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Gönderilecek JSON verisi (Controller'daki User modeline uygun)
        body: JSON.stringify({
          Username: username,
          PasswordHash: password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();

        console.log("API'DEN GELEN TAM NESNE:", userData);
    console.log("Kullanıcı ID'si:", userData.id);
    
        console.log(`✅ ${isRegistering ? "Kayıt" : "Giriş"} Başarılı:`, userData);
        
        // Başarılı giriş/kayıttan sonra ana uygulamaya geçiş yap
        onLogin(userData); 
      } else {
        // Hata durumunda sunucudan gelen mesajı al (örn: 401 Unauthorized)
        const errorText = await response.text(); 
        setError(isRegistering ? "Kayıt Başarısız: Bu kullanıcı zaten var." : "Giriş Başarısız: Kullanıcı adı veya şifre hatalı.");
        console.error("API Hatası:", errorText);
      }
    } catch (err) {
      // Ağ hatası (API çalışmıyor veya CORS problemi)
      setError("Sunucuya bağlanılamadı. API'nizin çalıştığından emin olun.");
      console.error("Fetch hatası:", err);
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      minHeight: "100vh", background: "linear-gradient(120deg, #f3e7ff, #ffffff)"
    }}>
      <div style={{ width: 450, marginBottom: 20 }}>
        <Lottie animationData={bunnyAnimation} loop={false} />
      </div>

      {/* Inputlar */}
      <input 
        type="text" 
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ padding: 10, margin: 5, borderRadius: 10, border: "1px solid #ccc" }}
      />
      <input 
        type="password" 
        placeholder="Şifre"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: 10, margin: 5, borderRadius: 10, border: "1px solid #ccc" }}
      />

      {/* Giriş/Kayıt Butonu */}
      <button 
        onClick={handleLoginOrRegister}
        style={{
          padding: 10, marginTop: 10, borderRadius: 10,
          border: "none", background: "#ff9bd6", color: "#fff",
          cursor: "pointer"
        }}
      >
        {isRegistering ? "Kayıt Ol" : "Giriş Yap"}
      </button>
      
      {/* Hata Mesajı */}
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      
      {/* Not: Bu bileşeni App.js içinde kullanırken isRegistering ve toggleRegister prop'larını geçmelisiniz. */}

    </div>
  );
}
import React, { useState } from "react";
import Lottie from "lottie-react";
import bunnyAnimation from "./Cute Shy Bunny.json";

export default function CuteReactLogin({ onLogin, isRegistering, toggleRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState(); // ✅ başarı mesajı için

  const API_BASE_URL = "http://localhost:5272/api/User";

  const handleLoginOrRegister = async () => {
    setError(null);
    setSuccessMessage(null);

    const endpoint = isRegistering ? "/Register" : "/Login";

    try {
      const response = await fetch(API_BASE_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username,
          PasswordHash: password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("API'DEN GELEN TAM NESNE:", userData);
        console.log("Kullanıcı ID'si:", userData.id);

        if (isRegistering) {
          setSuccessMessage("Kayıt başarılı! Artık günlük sayfanı görebilirsin.");
          
        }

        // Giriş veya kayıt sonrası DiaryPage açılıyor
        onLogin(userData);
      } else {
        await response.text();
        setError(
          isRegistering
            ? "Kayıt Başarısız: Bu kullanıcı zaten var."
            : "Giriş Başarısız: Kullanıcı adı veya şifre hatalı."
        );
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı. API'nizin çalıştığından emin olun.");
      console.error("Fetch hatası:", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f3e7ff, #ffffff)",
        position: "relative",
      }}
    >
      {/* Başarı mesajı */}
      {successMessage && (
        <div
          style={{
            position: "absolute",
            top: 20,
            backgroundColor: "#a063d1ff",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 10,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          {successMessage}
        </div>
      )}

      <div style={{ width: 450, marginBottom: 20 }}>
        <Lottie animationData={bunnyAnimation} loop={false} />
      </div>

      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: 10, margin: 5, borderRadius: 10, border: "1px solid #ccc" }}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 10, margin: 5, borderRadius: 10, border: "1px solid #ccc" }}
      />

      <button
        onClick={handleLoginOrRegister}
        style={{
          padding: 10,
          marginTop: 10,
          borderRadius: 10,
          border: "none",
          background: "#ff9bd6",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {isRegistering ? "Kayıt Ol" : "Giriş Yap"}
      </button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      <p
        onClick={toggleRegister}
        style={{
          marginTop: 15,
          cursor: "pointer",
          color: "#7b61ff",
          textDecoration: "underline",
        }}
      >
        {isRegistering ? "Zaten üye misin? Giriş Yap" : "Üye değil misin? Kayıt Ol"}
      </p>
    </div>
  );
}

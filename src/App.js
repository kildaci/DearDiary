import React, { useState } from "react";
import Landing from "./landing";
import CuteReactLogin from "./CuteReactLogin";
import DiaryPage from "./DiaryPage";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" veya "error"

  const handleLogin = (userData) => {
    setCurrentUser(userData);

    // Örnek: Kayıt başarılı mesajı
    if (isRegistering) {
      setMessage("Kayıt başarılı! Artık günlük sayfanı görebilirsin.");
      setMessageType("success");

      // 3 saniye sonra mesajı kaldır
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const toggleRegister = () => {
    setIsRegistering((prev) => !prev);
  };



  const isLoggedIn = currentUser !== null;
  const userId = currentUser ? currentUser.id : null;

  return (
    <div className="App">
      {/* Banner */}
      {message && (
        <div className={`banner ${messageType}`}>
          {message}
        </div>
      )}

      {/* Landing ekranı */}
      {showLanding && (
        <Landing
          onLoginClick={() => {
            setShowLanding(false);
            setIsRegistering(false);
          }}
          onRegisterClick={() => {
            setShowLanding(false);
            setIsRegistering(true);
          }}
        />
      )}

      {/* Login/Register ekranı */}
      {!showLanding && !isLoggedIn && (
        <CuteReactLogin
          onLogin={handleLogin}
          isRegistering={isRegistering}
          toggleRegister={toggleRegister}
        />
      )}

      {/* Günlük ekranı */}
      {isLoggedIn && <DiaryPage userId={userId} />}
      

    </div>
  );
}

export default App;

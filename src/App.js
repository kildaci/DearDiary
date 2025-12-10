import React, { useState } from "react";
import CuteReactLogin from "./CuteReactLogin";
import DiaryPage from "./DiaryPage";

function App() {
  // Giriş yapan kullanıcının verilerini (ID, Username vb.) tutar. 
  // Giriş yapılmadığında null'dır.
  const [currentUser, setCurrentUser] = useState(null); 
  
  // Login (Giriş) ve Register (Kayıt) modu arasında geçiş yapmak için state.
  const [isRegistering, setIsRegistering] = useState(false);

  // Başarılı giriş/kayıt sonrası çağrılır. userData, API'den gelen nesnedir.
  const handleLogin = (userData) => {
    // userData'nın, API'den { id: ..., username: ... } şeklinde geldiğini varsayıyoruz.
    setCurrentUser(userData);
  };
  
  // Kayıt modunu değiştiren fonksiyon
  const toggleRegister = () => {
    setIsRegistering(prev => !prev);
  };

  // Eğer currentUser null değilse (giriş yapılmışsa) true.
  const isLoggedIn = currentUser !== null;
  
  // Eğer giriş yapılmışsa, kullanıcının ID'sini (küçük 'i' ile id) DiaryPage'e ilet.
  const userId = currentUser ? currentUser.id : null;

  return (
    <>
      {isLoggedIn ? (
        // currentUser nesnesinden çekilen ID'yi userId prop'u olarak iletiyoruz.
        <DiaryPage userId={userId} /> 
      ) : (
        // Login bileşenine tüm gerekli bilgileri iletiyoruz.
        <CuteReactLogin 
          onLogin={handleLogin}
          isRegistering={isRegistering}
          toggleRegister={toggleRegister}
        />
      )}
    </>
  );
}

export default App;
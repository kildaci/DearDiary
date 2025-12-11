import React, { useState } from "react";

const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Kayıt sırasında hata oluştu.");
      }

      const data = await response.json();
      onRegisterSuccess(data); // Başarılı kayıt → kullanıcıyı login sayfasına veya dashboard'a yönlendir
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} style={styles.form}>
      <h2>Kayıt Ol</h2>
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="text"
        placeholder="Kullanıcı adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Kayıt Ol</button>
    </form>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "10px", width: "300px", margin: "auto" },
  error: { color: "red" },
};

export default Register;

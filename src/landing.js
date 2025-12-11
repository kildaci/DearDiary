import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import bunnyAnimation from "./Cute Shy Bunny.json";

const Landing = ({ onLoginClick, onRegisterClick }) => {
  const bunnyContainer = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    animRef.current = lottie.loadAnimation({
      container: bunnyContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: bunnyAnimation,
    });

    return () => animRef.current.destroy();
  }, []);

  const handleMouseEnter = () => {
    // Fare gelince animasyonu baştan oynat
    animRef.current.goToAndPlay(0, true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dear Diary 📔</h1>
        <p style={styles.text}>Dijital günlüğüne hoş geldin!</p>

        <button style={styles.btnPrimary} onClick={onRegisterClick}>
          Kayıt Ol
        </button>

        <button style={styles.btnSecondary} onClick={onLoginClick}>
          Giriş Yap
        </button>
      </div>

      {/* Tavşan kartın sağında */}
      <div
        ref={bunnyContainer}
        style={styles.bunny}
        onMouseEnter={handleMouseEnter}
      ></div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f2ff",
    position: "relative",
  },
  card: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "20px",
    background: "white",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    zIndex: 1,
  },
  title: { marginBottom: "10px" },
  text: { marginBottom: "20px", fontSize: "18px" },
  btnPrimary: {
    width: "200px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#7b61ff",
    color: "white",
    marginBottom: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
  btnSecondary: {
    width: "200px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #7b61ff",
    background: "white",
    color: "#7b61ff",
    cursor: "pointer",
    fontSize: "16px",
  },
  bunny: {
    width: "600px",
    height: "600px",
    cursor: "pointer",
    position: "absolute",
    right: "calc(50% - 700px)",
    top: "50%",
    transform: "translateY(-50%)",
  },
};

export default Landing;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaMapMarkedAlt, FaWallet, FaBiohazard } from "react-icons/fa";
import QuickSOS from "../components/QuickSOS";

import IntroSplash from "../components/IntroSplash";
import LoginPage from "../components/LoginPage";

// Module-scope variables persist across internal navigation but reset on refresh
let splashShownInSession = false;
let loggedInInSession = false;

export default function Home() {
  const navigate = useNavigate();

  const [showSplash, setShowSplash] = useState(!splashShownInSession);
  const [isLoggedIn, setIsLoggedIn] = useState(loggedInInSession);
  const [contentVisible, setContentVisible] = useState(loggedInInSession);

  const handleSplashFinish = () => {
    splashShownInSession = true;
    setShowSplash(false);
  };

  const handleLogin = () => {
    loggedInInSession = true;
    setIsLoggedIn(true);
    // Use immediate visibility if returning, else small delay for transition
    setContentVisible(true);
  };

  // 1. Show Splash (on refresh or first visit)
  if (showSplash) {
    return <IntroSplash onFinish={handleSplashFinish} />;
  }

  // 2. Show Login page (after splash)
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 3. Show Dashboard (Once logged in, skips splash/login on return visits)

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
        opacity: contentVisible ? 1 : 0,
        transition: "opacity 1s ease-in-out"
      }}
    >
      <style>{`
        @keyframes buttonPop {
          0% { transform: scale(0.5) translateY(50px); opacity: 0; }
          70% { transform: scale(1.1) translateY(-5px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .nav-button {
          padding: 24px 32px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(13, 8, 22, 0.7);
          backdrop-filter: blur(12px);
          color: white;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          alignItems: center;
          gap: 15px;
          min-width: 180px;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          opacity: 0;
        }
        .btn-1 { animation: buttonPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards; }
        .btn-2 { animation: buttonPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards; }
        .btn-3 { animation: buttonPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards; }

        .nav-button:hover {
          transform: translateY(-10px) scale(1.05);
          background: rgba(124, 58, 237, 0.2);
          border-color: rgba(124, 58, 237, 0.5);
          box-shadow: 0 20px 50px rgba(124, 58, 237, 0.4);
        }
        .nav-icon {
          font-size: 2rem;
          color: #FACC15;
          filter: drop-shadow(0 0 10px rgba(250, 204, 21, 0.3));
        }
        .nav-label {
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .home-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(10, 5, 16, 0.4), rgba(10, 5, 16, 0.9));
        }
      `}</style>

      <div className="home-overlay" />

      <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
        <h2 style={{
          fontSize: "1rem",
          color: "#FACC15",
          fontWeight: "800",
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginBottom: "10px"
        }}>
          Explore the Sacred
        </h2>
        <h1 style={{
          fontSize: clamp("2.5rem", "8vw", "4.5rem"),
          marginBottom: "10px",
          color: "white",
          fontWeight: "900",
          letterSpacing: "-2px"
        }}>
          TENJIKU
        </h1>
        <p style={{
          fontSize: "1.2rem",
          marginBottom: "50px",
          color: "rgba(255,255,255,0.6)",
          fontWeight: "500"
        }}>
          Travel with confidence not confusion
        </p>

        <div style={{ display: "flex", gap: "25px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/planning" className="nav-button btn-1">
            <FaMapMarkedAlt className="nav-icon" />
            <span className="nav-label">Trip Planning</span>
          </Link>

          <Link to="/split" className="nav-button btn-2">
            <FaWallet className="nav-icon" />
            <span className="nav-label">Split Money</span>
          </Link>

          <button onClick={() => navigate("/sos")} className="nav-button btn-3" style={{ background: "rgba(220, 38, 38, 0.15)", border: "1px solid rgba(220, 38, 38, 0.3)" }}>
            <FaBiohazard className="nav-icon" style={{ color: "#EF4444" }} />
            <span className="nav-label">SOS Emergency</span>
          </button>
        </div>
      </div>

      <QuickSOS />
    </div>
  );
}

function clamp(min: string, val: string, max: string) {
  return `clamp(${min}, ${val}, ${max})`;
}

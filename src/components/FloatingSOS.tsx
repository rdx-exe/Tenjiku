import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingSOS() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/sos")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        backgroundColor: isHovered ? "#cc0000" : "#ff0000",
        color: "white",
        border: "none",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(255, 0, 0, 0.4)",
        zIndex: 1000,
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
      }}
    >
      SOS
    </button>
  );
}
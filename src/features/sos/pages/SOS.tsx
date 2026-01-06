import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaShieldAlt,
  FaArrowLeft,
  FaAmbulance,
  FaBiohazard,
  FaCarCrash,
  FaUserShield,
  FaHandsHelping
} from "react-icons/fa";
import LocationShare from "../components/LocationShare";

export default function SOS() {
  const navigate = useNavigate();
  const [selectedEmergency, setSelectedEmergency] = useState<string | null>(null);

  const emergencyOptions = [
    { id: "medical", label: "Medical", color: "#EF4444", icon: <FaAmbulance /> },
    { id: "disaster", label: "Disaster", color: "#F59E0B", icon: <FaBiohazard /> },
    { id: "accident", label: "Accident", color: "#3B82F6", icon: <FaCarCrash /> },
    { id: "security", label: "Security", color: "#EF4444", icon: <FaUserShield /> },
    { id: "general", label: "General", color: "#8B5CF6", icon: <FaHandsHelping /> },
  ];

  const emergencyNumbers = [
    { name: "Police", number: "100", icon: <FaShieldAlt /> },
    { name: "Ambulance", number: "102", icon: <FaPhoneAlt /> },
    { name: "Fire", number: "101", icon: <FaExclamationTriangle /> },
    { name: "Disaster Management", number: "108", icon: <FaMapMarkerAlt /> },
    { name: "Tourist Police", number: "1363", icon: <FaShieldAlt /> },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        backgroundColor: "#0A0510",
        backgroundImage: "radial-gradient(circle at 0% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Outfit', sans-serif",
        paddingBottom: "40px",
        overflowX: "hidden",
      }}
    >
      {/* Header Navigation */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px 20px 10px 20px",
          display: "flex",
          justifyContent: "flex-start",
          zIndex: 100
        }}
      >
        <motion.button
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: -2, background: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            color: "white",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          <FaArrowLeft size={12} />
          Back
        </motion.button>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "10px 20px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(25px, 6vw, 40px)",
          zIndex: 10
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: "center" }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "100px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#EF4444",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "12px"
            }}
          >
            Immediate Assistance
          </motion.div>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 8vw, 3rem)",
              color: "white",
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-1px",
              lineHeight: 1.1
            }}
          >
            SOS Emergency
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.4)",
            marginTop: "8px",
            fontWeight: 500,
            fontSize: "clamp(0.85rem, 4vw, 1rem)",
            padding: "0 10px"
          }}>
            Select your emergency type for priority handling
          </p>
        </div>

        {/* Emergency Type Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "15px",
            width: "100%",
          }}
        >
          {emergencyOptions.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedEmergency(option.id)}
              style={{
                padding: "20px 10px",
                background: selectedEmergency === option.id
                  ? `linear-gradient(135deg, ${option.color}dd, ${option.color}88)`
                  : "rgba(255, 255, 255, 0.03)",
                border: `1px solid ${selectedEmergency === option.id ? option.color : "rgba(255, 255, 255, 0.1)"}`,
                borderRadius: "20px",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                boxShadow: selectedEmergency === option.id ? `0 10px 25px ${option.color}44` : "none"
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>
                {option.icon}
              </span>
              {option.label}
            </motion.button>
          ))}
        </div>

        {/* Location Share Section */}
        {selectedEmergency && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: "rgba(124, 58, 237, 0.08)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              borderRadius: "24px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "inset 0 0 20px rgba(124, 58, 237, 0.1)",
              backdropFilter: "blur(5px)"
            }}
          >
            <LocationShare />
          </motion.div>
        )}

        {/* Emergency Numbers List */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "32px",
            padding: "clamp(20px, 5vw, 40px)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "30px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#FACC15", display: "flex", alignItems: "center", justifyContent: "center", color: "#000" }}>
              <FaPhoneAlt />
            </div>
            <div>
              <h2 style={{ color: "white", margin: 0, fontSize: "1.5rem", fontWeight: 800 }}>Hotlines</h2>
              <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "0.9rem" }}>Direct tap to dial emergency services</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {emergencyNumbers.map((item) => (
              <motion.button
                key={item.number}
                whileHover={{ x: 10, background: "rgba(255, 255, 255, 0.05)" }}
                onClick={() => handleCall(item.number)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 25px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "20px",
                  cursor: "pointer",
                  color: "white",
                  textAlign: "left"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <span style={{ fontSize: "1.2rem", color: "#FACC15" }}>{item.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", letterSpacing: "2px" }}>{item.number}</p>
                  </div>
                </div>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FaPhoneAlt size={14} color="#FACC15" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        body { margin: 0; background-color: #0A0510; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { useSplit } from "../SplitContext";
import { useIsMobile } from "../components/ui/use-mobile";
import QuickSOS from "../../../components/QuickSOS";

export default function Participants() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { participants, addParticipant } = useSplit();
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    addParticipant(name.trim());
    setName("");
  };

  return (
    <>
      <div style={{
        padding: isMobile ? "24px 16px" : "60px 40px",
        width: "100%",
        fontFamily: "'Outfit', sans-serif",
        background: "#0A0510",
        backgroundImage: "radial-gradient(circle at 0% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(192, 132, 252, 0.05) 0%, transparent 40%)",
        minHeight: "100vh",
        color: "white"
      }}>
        <header style={{ marginBottom: "40px" }}>
          <button
            onClick={() => navigate("/split/dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              marginBottom: "32px",
              padding: "10px 20px",
              borderRadius: "14px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(124, 58, 237, 0.1)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)")}
          >
            <FaArrowLeft style={{ color: "#FACC15" }} /> Back to Dashboard
          </button>
          <h1 style={{ margin: 0, fontSize: isMobile ? "2rem" : "2.8rem", color: "white", fontWeight: "900", letterSpacing: "-1px" }}>
            MANAGE <span style={{ color: "#C084FC" }}>PARTICIPANTS</span>
          </h1>
        </header>

        <div className="glass-card" style={{
          padding: isMobile ? "24px 20px" : "40px",
          maxWidth: "800px",
        }}>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "12px",
            marginBottom: "32px"
          }}>
            <input
              style={{
                flex: 1,
                padding: "16px 20px",
                borderRadius: "16px",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                fontSize: "1rem",
                outline: "none",
                background: "rgba(255, 255, 255, 0.05)",
                color: "white"
              }}
              placeholder="Enter participant name (e.g. Alex)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            />
            <button
              onClick={handleAdd}
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                color: "#fff",
                border: "none",
                padding: "16px 32px",
                borderRadius: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontWeight: "700",
                boxShadow: "0 10px 20px rgba(124, 58, 237, 0.3)",
                transition: "all 0.3s"
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <FaPlus /> Add Member
            </button>
          </div>

          <div style={{ display: "grid", gap: "12px" }}>
            {participants.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "20px" }}>
                <p style={{ color: "rgba(255,255,255,0.3)", margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                  No participants added yet.
                </p>
              </div>
            ) : (
              participants.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 24px",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    transition: "all 0.3s"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.3)")}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #7C3AED, #C084FC)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      boxShadow: "0 4px 10px rgba(124, 58, 237, 0.3)"
                    }}>
                      {p.initial}
                    </div>
                    <span style={{ fontWeight: "700", color: "white", fontSize: "1.1rem" }}>{p.name}</span>
                  </div>
                  <button
                    style={{
                      background: "rgba(248, 113, 113, 0.1)",
                      border: "none",
                      color: "#F87171",
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "rgba(248, 113, 113, 0.2)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "rgba(248, 113, 113, 0.1)")}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <QuickSOS />
    </>
  );
}

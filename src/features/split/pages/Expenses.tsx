import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaReceipt, FaTrash, FaUserCircle } from "react-icons/fa";
import { useSplit } from "../SplitContext";
import { useIsMobile } from "../components/ui/use-mobile";
import QuickSOS from "../../../components/QuickSOS";

export default function Expenses() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { expenses } = useSplit();

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
            EXPENSE <span style={{ color: "#C084FC" }}>HISTORY</span>
          </h1>
        </header>

        <div className="glass-card" style={{
          padding: isMobile ? "24px 20px" : "40px",
          maxWidth: "1000px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ padding: "10px", borderRadius: "12px", background: "rgba(192, 132, 252, 0.1)", color: "#C084FC", border: "1px solid rgba(192, 132, 252, 0.2)" }}>
              <FaReceipt size={24} />
            </div>
            <h2 style={{ margin: 0, color: "white", fontSize: "1.6rem", fontWeight: "800", letterSpacing: "-0.5px" }}>All Recorded Expenses</h2>
          </div>

          <div style={{ width: "100%", display: "grid", gap: "16px" }}>
            {expenses.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "24px" }}>
                <p style={{ color: "rgba(255,255,255,0.3)", margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>
                  No expenses recorded yet. Go to Dashboard to add one!
                </p>
              </div>
            ) : (
              expenses.map((e, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    padding: "20px 24px",
                    background: "rgba(255, 255, 255, 0.02)",
                    borderRadius: "18px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    gap: isMobile ? "16px" : "0",
                    transition: "all 0.3s"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.3)")}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "14px",
                      background: "rgba(250, 204, 21, 0.1)",
                      color: "#FACC15",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(250, 204, 21, 0.2)"
                    }}>
                      <FaReceipt size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 6px 0", color: "white", fontSize: "1.1rem", fontWeight: "700" }}>{e.title}</h4>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255, 255, 255, 0.4)", fontSize: "0.9rem", fontWeight: "600" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <FaUserCircle size={14} color="#C084FC" /> Paid by <span style={{ color: "rgba(255,255,255,0.7)" }}>{e.payer}</span>
                        </span>
                        <span>•</span>
                        <span>{e.date}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    width: isMobile ? "100%" : "auto",
                    justifyContent: isMobile ? "space-between" : "flex-end"
                  }}>
                    <span style={{ fontWeight: "800", color: "#FACC15", fontSize: "1.3rem" }}>
                      ₹{e.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <button
                      style={{
                        background: "rgba(248, 113, 113, 0.1)",
                        border: "none",
                        color: "#F87171",
                        cursor: "pointer",
                        padding: "10px",
                        borderRadius: "10px",
                        transition: "all 0.3s"
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = "rgba(248, 113, 113, 0.2)")}
                      onMouseOut={(e) => (e.currentTarget.style.background = "rgba(248, 113, 113, 0.1)")}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => navigate("/split/dashboard")}
            style={{
              width: "100%",
              padding: isMobile ? "24px" : "32px",
              marginTop: "40px",
              borderRadius: "20px",
              border: "2px dashed rgba(124, 58, 237, 0.3)",
              background: "rgba(124, 58, 237, 0.05)",
              color: "#C084FC",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s",
              fontSize: "1rem"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(124, 58, 237, 0.1)";
              e.currentTarget.style.borderColor = "#7C3AED";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(124, 58, 237, 0.05)";
              e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.3)";
            }}
          >
            Add More Expenses in Dashboard
          </button>
        </div>
      </div>
      <QuickSOS />
    </>
  );
}

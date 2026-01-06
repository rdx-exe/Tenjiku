import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMoneyCheckAlt, FaArrowRight, FaHistory } from "react-icons/fa";
import { useSplit } from "../SplitContext";
import { useIsMobile } from "../components/ui/use-mobile";
import QuickSOS from "../../../components/QuickSOS";

export default function Payments() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { payments } = useSplit();

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
                        PAYMENT <span style={{ color: "#C084FC" }}>HISTORY</span>
                    </h1>
                </header>

                <div className="glass-card" style={{
                    padding: isMobile ? "24px 20px" : "40px",
                    maxWidth: "900px",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                        <div style={{ padding: "10px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", color: "#10B981", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                            <FaHistory size={24} />
                        </div>
                        <h2 style={{ margin: 0, color: "white", fontSize: "1.6rem", fontWeight: "800", letterSpacing: "-0.5px" }}>Recent Settlements</h2>
                    </div>

                    <div style={{ display: "grid", gap: "16px" }}>
                        {payments.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "80px 20px", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "24px" }}>
                                <FaMoneyCheckAlt size={50} style={{ marginBottom: "20px", color: "rgba(255,255,255,0.1)" }} />
                                <p style={{ color: "rgba(255,255,255,0.3)", margin: 0, fontSize: "1.1rem", fontWeight: "600" }}>No payments recorded yet.</p>
                            </div>
                        ) : (
                            payments.map((p, i) => (
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
                                            background: "rgba(16, 185, 129, 0.1)",
                                            color: "#10B981",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "1px solid rgba(16, 185, 129, 0.2)"
                                        }}>
                                            <FaMoneyCheckAlt size={20} />
                                        </div>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "800", color: "white", fontSize: "1.1rem" }}>
                                                {p.from} <FaArrowRight size={14} color="#FACC15" /> {p.to}
                                            </div>
                                            <div style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.4)", marginTop: "6px", fontWeight: "600" }}>
                                                {p.date} • <span style={{ color: "rgba(255,255,255,0.6)" }}>{p.description || "Settlement Payment"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        fontWeight: "800",
                                        color: "#10B981",
                                        fontSize: "1.3rem",
                                        width: isMobile ? "100%" : "auto",
                                        textAlign: isMobile ? "right" : "left"
                                    }}>
                                        ₹{p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
                        Record More Payments in Dashboard
                    </button>
                </div>
            </div>
            <QuickSOS />
        </>
    );
}

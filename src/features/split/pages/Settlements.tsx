import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBalanceScale,
  FaInfoCircle,
  FaArrowRight,
  FaCopy,
  FaCheckCircle
} from "react-icons/fa";
import { useSplit } from "../SplitContext";
import { useIsMobile } from "../components/ui/use-mobile";
import QuickSOS from "../../../components/QuickSOS";

interface Settlement {
  from: string;
  to: string;
  amount: number;
}

export default function Settlements() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { participants, markAsPaid } = useSplit();

  const settlements = useMemo(() => {
    // Calculate settlements when participants change
    const debtors = participants
      .filter((p) => p.amount < -0.01)
      .map((p) => ({ name: p.name, amount: Math.abs(p.amount) }))
      .sort((a, b) => b.amount - a.amount);

    const creditors = participants
      .filter((p) => p.amount > 0.01)
      .map((p) => ({ name: p.name, amount: p.amount }))
      .sort((a, b) => b.amount - a.amount);

    const tempSettlements: Settlement[] = [];
    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debt = debtors[i].amount;
      const credit = creditors[j].amount;
      const settledAmount = Math.min(debt, credit);

      if (settledAmount > 0.01) {
        tempSettlements.push({
          from: debtors[i].name,
          to: creditors[j].name,
          amount: settledAmount,
        });
      }

      debtors[i].amount -= settledAmount;
      creditors[j].amount -= settledAmount;

      if (debtors[i].amount < 0.01) i++;
      if (creditors[j].amount < 0.01) j++;
    }

    return tempSettlements;
  }, [participants]);

  const handleMarkAsPaid = (index: number) => {
    const s = settlements[index];
    markAsPaid(s.from, s.to, s.amount);
  };

  const gettingBackCount = participants.filter(p => p.amount > 0.01).length;
  const oweMoneyCount = participants.filter(p => p.amount < -0.01).length;
  const settledCount = participants.filter(p => Math.abs(p.amount) < 0.01).length;
  const totalToSettle = settlements.reduce((sum, s) => sum + s.amount, 0);

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
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ color: "#FACC15", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.8rem", fontWeight: "800" }}>Final Calculation</span>
          </div>
          <h1 style={{ margin: 0, fontSize: isMobile ? "2.2rem" : "3.2rem", color: "white", fontWeight: "900", letterSpacing: "-1.5px" }}>
            SETTLE <span style={{ color: "#C084FC" }}>UP</span>
          </h1>
        </header>

        {/* SETTLEMENT SUMMARY CARD */}
        <div className="glass-card" style={{
          padding: "32px",
          marginBottom: "40px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontWeight: "800", color: "white", fontSize: "1.2rem" }}>
              <FaBalanceScale color="#C084FC" size={24} /> SETTLEMENT SUMMARY
            </div>
            <div style={{
              padding: "6px 16px",
              background: "rgba(124, 58, 237, 0.15)",
              borderRadius: "20px",
              fontSize: "0.8rem",
              color: "#C084FC",
              fontWeight: "800",
              border: "1px solid rgba(124, 58, 237, 0.2)"
            }}>
              {settlements.length} PAYMENTS REMAINING
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            textAlign: "center",
            marginBottom: "40px",
            gap: isMobile ? "32px" : "0"
          }}>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "900", color: "#10B981" }}>{gettingBackCount}</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", marginTop: "8px", fontWeight: "700", textTransform: "uppercase" }}>Getting Money Back</div>
            </div>
            <div style={{
              borderLeft: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
              borderRight: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
              borderTop: isMobile ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
              borderBottom: isMobile ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
              padding: isMobile ? "32px 0" : "0"
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "900", color: "#F87171" }}>{oweMoneyCount}</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", marginTop: "8px", fontWeight: "700", textTransform: "uppercase" }}>Owe Money</div>
            </div>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "900", color: "#C084FC" }}>{settledCount}</div>
              <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.5)", marginTop: "8px", fontWeight: "700", textTransform: "uppercase" }}>Fully Settled</div>
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "1rem", color: "rgba(255, 255, 255, 0.6)", fontWeight: "600" }}>Total Amount to Settle</span>
            <span style={{ fontSize: "1.8rem", fontWeight: "900", color: "#FACC15" }}>₹{totalToSettle.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* PAYMENT INSTRUCTIONS */}
        <div>
          <h3 style={{ fontSize: "1.4rem", marginBottom: "20px", color: "white", fontWeight: "800", letterSpacing: "-0.5px" }}>PAYMENT INSTRUCTIONS</h3>

          <div style={{
            background: "rgba(124, 58, 237, 0.05)",
            padding: "20px 24px",
            borderRadius: "16px",
            border: "1px solid rgba(124, 58, 237, 0.1)",
            display: "flex",
            gap: "16px",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "0.95rem",
            marginBottom: "32px",
            lineHeight: "1.6",
            fontWeight: "600"
          }}>
            <FaInfoCircle color="#C084FC" style={{ marginTop: "3px", flexShrink: 0 }} size={20} />
            These are the minimum number of transactions needed to settle all debts efficiently.
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {participants.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "24px" }}>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "1.1rem", fontWeight: "600" }}>Add participants in the dashboard to see settlements.</p>
              </div>
            ) : settlements.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", border: "2px dashed rgba(16, 185, 129, 0.2)", borderRadius: "24px", background: "rgba(16, 185, 129, 0.02)" }}>
                <FaCheckCircle size={50} color="#10B981" style={{ marginBottom: "20px", opacity: 0.5 }} />
                <p style={{ color: "#10B981", fontSize: "1.2rem", fontWeight: "800" }}>Everything is settled! Good job!</p>
              </div>
            ) : (
              settlements.map((s, i) => (
                <div key={i} className="glass-card" style={{
                  padding: "24px 28px",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "stretch" : "center",
                  gap: isMobile ? "24px" : "0"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    justifyContent: isMobile ? "space-between" : "flex-start",
                    flexWrap: "nowrap"
                  }}>
                    <Avatar name={s.from} color="#F87171" size={40} />
                    <span style={{ fontWeight: "800", color: "white", fontSize: "1.1rem" }}>{s.from}</span>
                    <FaArrowRight color="rgba(255, 255, 255, 0.2)" size={16} />
                    <Avatar name={s.to} color="#10B981" size={40} />
                    <span style={{ fontWeight: "800", color: "white", fontSize: "1.1rem" }}>{s.to}</span>
                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                    justifyContent: isMobile ? "space-between" : "flex-end"
                  }}>
                    <div style={{ textAlign: isMobile ? "left" : "right" }}>
                      <div style={{ fontWeight: "900", color: "#FACC15", fontSize: "1.5rem" }}>₹{s.amount.toFixed(2)}</div>
                      <div style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.4)", fontWeight: "800", textTransform: "uppercase" }}>Required Payment</div>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        padding: "12px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        color: "rgba(255, 255, 255, 0.6)",
                        transition: "all 0.3s"
                      }}
                        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                        onMouseOut={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"}
                        title="Copy Amount"
                      >
                        <FaCopy size={16} />
                      </button>
                      <button
                        onClick={() => handleMarkAsPaid(i)}
                        style={{
                          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                          color: "#fff",
                          border: "none",
                          padding: "12px 24px",
                          borderRadius: "12px",
                          fontSize: "0.9rem",
                          fontWeight: "800",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 6px 15px rgba(16, 185, 129, 0.2)",
                          transition: "all 0.3s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                      >
                        <FaCheckCircle size={16} /> Mark as Paid
                      </button>
                    </div>
                  </div>
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

function Avatar({ name, color, size = 32 }: { name: string; color: string; size?: number }) {
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "14px",
      background: color,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: `${size * 0.4}px`,
      fontWeight: "900",
      boxShadow: `0 4px 10px ${color}44`
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

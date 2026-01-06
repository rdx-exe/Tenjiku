import { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaUserPlus,
  FaReceipt,
  FaMoneyBillWave,
  FaBalanceScale,
  FaDownload,
  FaCreditCard,
  FaChartLine,
  FaUsers,
  FaFileInvoiceDollar,
  FaPlus,
  FaChevronDown,
  FaCheckCircle,
  FaHistory,
  FaUserFriends,
  FaArrowLeft,
  FaPlusCircle,
  FaTrash,
  FaEdit,
  FaHome,
  FaCheck
} from "react-icons/fa";
import { useSplit } from "../SplitContext";
import { useIsMobile } from "../components/ui/use-mobile";
import QuickSOS from "../../../components/QuickSOS";
import Modal from "../../../components/Modal";

export default function SplitHome() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const {
    participants,
    expenses,
    payments,
    activities,
    addParticipant,
    addExpense,
    recordPayment,
    currentTripName,
    trips,
    startNewTrip,
    restoreTrip,
    deleteTrip,
    archiveCurrentTrip
  } = useSplit();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedHistoryTrip, setSelectedHistoryTrip] = useState<any | null>(null);

  // FORM REFS & STATE
  const partNameRef = useRef<HTMLInputElement>(null);
  const expDescRef = useRef<HTMLInputElement>(null);
  const tripNameRef = useRef<HTMLInputElement>(null);
  const [expAmount, setExpAmount] = useState<string>("");
  const [expPayer, setExpPayer] = useState("Select who paid");
  const [splitType, setSplitType] = useState<'equal' | 'percentage' | 'custom'>('equal');
  const [splitValues, setSplitValues] = useState<{ [name: string]: string }>({});

  const [payFrom, setPayFrom] = useState("Who is paying?");
  const [payTo, setPayTo] = useState("Who is receiving?");
  const payAmountRef = useRef<HTMLInputElement>(null);
  const payDescRef = useRef<HTMLTextAreaElement>(null);
  const [payDate, setPayDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (searchParams.get("view") === "history") {
      setActiveModal("history");
    } else {
      setActiveModal(null);
    }
  }, [searchParams]);

  // INITIALIZE SPLIT VALUES WHEN MODAL OPENS OR PARTICIPANTS CHANGE
  useEffect(() => {
    if (activeModal === 'addExpense') {
      const initial: { [name: string]: string } = {};
      participants.forEach(p => {
        initial[p.name] = splitType === 'percentage' ? (100 / participants.length).toString() : "";
      });
      setSplitValues(initial);
    }
  }, [activeModal, participants, splitType]);

  const closeModal = () => {
    setActiveModal(null);
    setSelectedHistoryTrip(null);
    setExpPayer("Select who paid");
    setPayFrom("Who is paying?");
    setPayTo("Who is receiving?");
    setSplitType('equal');
    setExpAmount("");
  };

  const totalSplitValue = useMemo(() => {
    const amountNum = Number(expAmount) || 0;
    if (splitType === 'equal') return amountNum;
    if (splitType === 'custom') return Object.values(splitValues).reduce((a, b) => a + (Number(b) || 0), 0);
    if (splitType === 'percentage') {
      const totalPct = Object.values(splitValues).reduce((a, b) => a + (Number(b) || 0), 0);
      return (totalPct / 100) * amountNum;
    }
    return 0;
  }, [splitValues, splitType, expAmount]);

  const totalPercentage = useMemo(() => {
    if (splitType !== 'percentage') return 0;
    return Object.values(splitValues).reduce((a, b) => a + (Number(b) || 0), 0);
  }, [splitValues, splitType]);

  const handleAddParticipant = () => {
    const name = partNameRef.current?.value;
    if (name) {
      addParticipant(name);
      closeModal();
    }
  };

  const handleAddExpense = () => {
    const title = expDescRef.current?.value;
    const amountNum = Number(expAmount);
    if (!title || !amountNum || expPayer === "Select who paid") {
      alert("Please fill all required fields");
      return;
    }

    if (splitType === 'percentage') {
      if (Math.abs(totalPercentage - 100) > 0.1) {
        alert("Percentages must add up to 100%");
        return;
      }
    } else if (splitType === 'custom') {
      if (Math.abs(totalSplitValue - amountNum) > 0.1) {
        alert(`Custom amounts must add up to the total (₹${amountNum})`);
        return;
      }
    }

    const numericSplitDetails: { [name: string]: number } = {};
    Object.keys(splitValues).forEach(name => {
      numericSplitDetails[name] = Number(splitValues[name]) || 0;
    });

    addExpense(title, amountNum, expPayer, splitType, numericSplitDetails);
    closeModal();
  };

  const handleRecordPayment = () => {
    const amount = Number(payAmountRef.current?.value);
    const desc = payDescRef.current?.value || "";
    if (!amount || payFrom === "Who is paying?" || payTo === "Who is receiving?") {
      alert("Please fill all required fields");
      return;
    }
    if (payFrom === payTo) {
      alert("Sender and receiver cannot be the same person");
      return;
    }
    recordPayment(payFrom, payTo, amount, payDate, desc);
    closeModal();
  };


  // CALCULATE SETTLEMENTS FOR THE HOME SCREEN PREVIEW
  const settlementList = useMemo(() => {
    const debtors = participants
      .filter((p) => p.amount < -0.01)
      .map((p) => ({ name: p.name, amount: Math.abs(p.amount) }))
      .sort((a, b) => b.amount - a.amount);

    const creditors = participants
      .filter((p) => p.amount > 0.01)
      .map((p) => ({ name: p.name, amount: p.amount }))
      .sort((a, b) => b.amount - a.amount);

    const result = [];
    let i = 0;
    let j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debt = debtors[i].amount;
      const credit = creditors[j].amount;
      const settledAmount = Math.min(debt, credit);
      if (settledAmount > 0.01) {
        result.push({
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
    return result;
  }, [participants]);

  const totalExpensesSum = expenses.reduce((sum, e) => sum + e.amount, 0);

  // PRINT/PDF GENERATION UTILS
  const generatePrintReport = (title: string, sections: { title: string, headers: string[], rows: any[][] }[]) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const reportHtml = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: 'Inter', sans-serif; color: #333; padding: 40px; }
            h1 { text-align: center; margin-bottom: 5px; font-size: 28px; }
            p.subtitle { text-align: center; color: #666; margin-bottom: 40px; font-size: 14px; }
            .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 40px; }
            .stat-box { border: 1px solid #ddd; padding: 20px; text-align: center; border-radius: 8px; }
            .stat-label { color: #888; font-size: 12px; font-weight: 600; margin-bottom: 8px; }
            .stat-value { font-size: 18px; font-weight: 700; color: #00b2a9; }
            h3 { border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 30px; font-size: 18px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }
            th { text-align: left; background: #f8fafb; padding: 12px; border-bottom: 2px solid #eee; font-size: 13px; color: #666; }
            td { padding: 12px; border-bottom: 1px solid #eee; font-size: 13px; }
            .amount { font-weight: 700; text-align: right; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          
          ${sections.map(section => `
            <h3>${section.title}</h3>
            <table>
              <thead>
                <tr>${section.headers.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${section.rows.length === 0 ? '<tr><td colspan="100%" style="text-align:center">No data found</td></tr>' :
        section.rows.map(row => `
                    <tr>${row.map((cell, idx) => `<td class="${idx === row.length - 1 ? 'amount' : ''}">${cell}</td>`).join('')}</tr>
                  `).join('')
      }
              </tbody>
            </table>
          `).join('')}

          <script>
            window.onload = () => {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(reportHtml);
    printWindow.document.close();
  };

  const handleExportExpenses = () => {
    generatePrintReport("Expenses Report", [{
      title: "Expense Details",
      headers: ["Title", "Paid By", "Date", "Split Type", "Amount"],
      rows: expenses.map(e => [e.title, e.payer, e.date, e.splitType, `₹${e.amount.toFixed(2)}`])
    }]);
  };

  const handleExportPayments = () => {
    generatePrintReport("Payment History", [{
      title: "Recorded Payments",
      headers: ["From", "To", "Description", "Date", "Amount"],
      rows: payments.map(p => [p.from, p.to, p.description, p.date, `₹${p.amount.toFixed(2)}`])
    }]);
  };

  const handleExportParticipants = () => {
    generatePrintReport("Participant Summary", [{
      title: "Active Participants",
      headers: ["Name", "Status", "Balance"],
      rows: participants.map(p => [p.name, p.status, `₹${Math.abs(p.amount).toFixed(2)}`])
    }]);
  };

  const handleExportSettlements = () => {
    generatePrintReport("Settlement Guide", [{
      title: "Who Owes Whom",
      headers: ["From", "To", "Optimal Amount"],
      rows: settlementList.map(s => [s.from, s.to, `₹${s.amount.toFixed(2)}`])
    }]);
  };

  const handleExportFullReport = () => {
    generatePrintReport("Complete Trip Ledger", [
      {
        title: "Participants",
        headers: ["Name", "Status", "Balance"],
        rows: participants.map(p => [p.name, p.status, `₹${Math.abs(p.amount).toFixed(2)}`])
      },
      {
        title: "Settlements",
        headers: ["From", "To", "Amount"],
        rows: settlementList.map(s => [s.from, s.to, `₹${s.amount.toFixed(2)}`])
      },
      {
        title: "Expenses",
        headers: ["Title", "Paid By", "Date", "Amount"],
        rows: expenses.map(e => [e.title, e.payer, e.date, `₹${e.amount.toFixed(2)}`])
      },
      {
        title: "Paymentshistory",
        headers: ["From", "To", "Date", "Amount"],
        rows: payments.map(p => [p.from, p.to, p.date, `₹${p.amount.toFixed(2)}`])
      }
    ]);
  };

  if (searchParams.get("view") === "history") {
    return (
      <div style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0A0510",
        backgroundImage: `
            radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(192, 132, 252, 0.05) 0px, transparent 50%)
        `,
        padding: isMobile ? "20px 16px" : "60px 24px",
        fontFamily: "'Outfit', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white"
      }}>
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <header style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={() => navigate("/split")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              <FaArrowLeft /> Back to Landing
            </button>
            <h1 style={{ margin: 0, fontSize: "1.8rem", color: "#333" }}>History</h1>
          </header>

          <div style={{ background: "rgba(255, 255, 255, 0.02)", borderRadius: "24px", padding: "32px", border: "1px solid rgba(124, 58, 237, 0.2)", backdropFilter: "blur(20px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", color: "white", fontWeight: "700" }}>
              <FaHistory color="#FACC15" /> Your Past Trips
            </div>

            {trips.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <FaHistory size={48} style={{ color: "#eee", marginBottom: "16px" }} />
                <p style={{ color: "#888", fontSize: "1.1rem" }}>No past trips found yet.</p>
                <button
                  onClick={() => navigate("/split")}
                  style={{ marginTop: "20px", background: "#00b2a9", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
                >
                  Start Your First Trip
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "16px" }}>
                {trips.map((trip: any) => (
                  <div
                    key={trip.id}
                    style={{
                      padding: "20px",
                      borderRadius: "14px",
                      border: "1px solid #eee",
                      background: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#5709e8";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#eee";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, color: "#333", fontSize: "1.1rem" }}>{trip.name}</h4>
                      <p style={{ margin: "6px 0 0", color: "#888", fontSize: "0.9rem" }}>
                        {trip.date} • {trip.participants.length} members • <strong>₹{trip.totalExpenses.toLocaleString()}</strong>
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => {
                          restoreTrip(trip.id);
                          navigate("/split/dashboard");
                        }}
                        style={{
                          padding: "10px 18px",
                          borderRadius: "10px",
                          border: "none",
                          background: "#f0f0ff",
                          color: "#5709e8",
                          cursor: "pointer",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        <FaEdit /> Restore
                      </button>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        style={{
                          padding: "10px",
                          borderRadius: "10px",
                          border: "none",
                          background: "#fff1f0",
                          color: "#ff4d4f",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <QuickSOS />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#0A0510",
          backgroundImage: `
              radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.12) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(192, 132, 252, 0.08) 0px, transparent 50%)
          `,
          padding: isMobile ? "20px 16px" : "40px 24px",
          fontFamily: "'Outfit', sans-serif",
          color: "white"
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap');
          * { font-family: 'Outfit', sans-serif; }
          .glass-card {
            background: rgba(13, 8, 22, 0.6);
            border: 1px solid rgba(124, 58, 237, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 28px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          .glass-card:hover {
            border-color: rgba(124, 58, 237, 0.4);
            background: rgba(13, 8, 22, 0.8);
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          }
          .tagline-accent {
            color: #FACC15;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 0.8rem;
            font-weight: 800;
          }
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 500px), 1fr));
            gap: 24px;
            margin-bottom: 24px;
          }
          @media (max-width: 768px) {
            .dashboard-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
        <div style={{ width: "100%", padding: isMobile ? "0" : "0 40px" }}>
          {/* HEADER */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            marginBottom: "32px",
            gap: isMobile ? "20px" : "0"
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: isMobile ? "1.6rem" : "2.2rem", color: "white", fontWeight: "900", letterSpacing: "-1px" }}>GROUP EXPENSES</h1>
              <p style={{ margin: "5px 0 0", fontWeight: "800", color: "#FACC15", letterSpacing: "1px", fontSize: "0.9rem" }}>{currentTripName.toUpperCase()}</p>
            </div>
            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              width: isMobile ? "100%" : "auto"
            }}>
              <HeaderButton icon={<FaCheck />} label="Save & Finish" onClick={() => setActiveModal("finishTrip")} />
              <HeaderButton icon={<FaHistory />} label="History" onClick={() => setActiveModal("history")} />
              <HeaderButton icon={<FaDownload />} label="Export" onClick={() => setActiveModal("export")} />
              <HeaderButton icon={<FaCreditCard />} label="Payments" onClick={() => navigate("/split/payments")} />
              <HeaderButton icon={<FaChartLine />} label="Activity" onClick={() => navigate("/split/expenses")} />
              <HeaderButton icon={<FaHome />} label="Home" onClick={() => navigate("/")} />
            </div>
          </div>

          {/* STATS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
            gap: "16px",
            marginBottom: "32px"
          }}>
            <StatCard label="Total Expenses" value={`₹${totalExpensesSum.toLocaleString()}`} icon={<FaFileInvoiceDollar />} />
            <StatCard label="Participants" value={participants.length.toString()} icon={<FaUsers />} />
            <StatCard label="Expenses" value={expenses.length.toString()} icon={<FaReceipt />} />
            <StatCard label="Payments" value={payments.length.toString()} icon={<FaMoneyBillWave />} />
            <div style={{ gridColumn: isMobile ? "span 2" : "span 1" }}>
              <StatCard label="Settlements" value={settlementList.length.toString()} icon={<FaBalanceScale />} />
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "32px"
          }}>
            <QuickAction
              icon={<FaUserPlus />}
              title="Add Participant"
              desc={isMobile ? "Add person" : "Add someone to the trip"}
              onClick={() => setActiveModal("addParticipant")}
            />
            <QuickAction
              icon={<FaReceipt />}
              title="Add Expense"
              desc={isMobile ? "Record" : "Record a new expense"}
              onClick={() => setActiveModal("addExpense")}
            />
            <QuickAction
              icon={<FaMoneyBillWave />}
              title="Record Payment"
              desc={isMobile ? "Log pay" : "Log a payment made"}
              onClick={() => setActiveModal("recordPayment")}
            />
            <QuickAction
              icon={<FaBalanceScale />}
              title="View Settlements"
              desc={isMobile ? "See debts" : "See who owes whom"}
              onClick={() => navigate("/split/settlements")}
            />
          </div>

          {/* TOP GRID: PARTICIPANTS & RECENT EXPENSES */}
          <div className="dashboard-grid">
            <Section
              title="Participants"
              onAdd={() => setActiveModal("addParticipant")}
              onViewAll={() => navigate("/split/participants")}
            >
              {participants.length === 0 ? (
                <EmptyState message="No participants yet. Add people to start!" />
              ) : (
                <div style={{ display: "grid", gap: "12px" }}>
                  {participants.map((p, i) => (
                    <ParticipantRow key={i} participant={p} />
                  ))}
                </div>
              )}
            </Section>

            <Section
              title="Recent Expenses"
              onAdd={() => setActiveModal("addExpense")}
              onViewAll={() => navigate("/split/expenses")}
            >
              {expenses.length === 0 ? (
                <EmptyState message="No expenses yet. Record your first expense!" />
              ) : (
                <div style={{ display: "grid", gap: "12px" }}>
                  {expenses.slice(0, 5).map((e, i) => (
                    <ExpenseRow key={i} expense={e} />
                  ))}
                </div>
              )}
            </Section>
          </div>

          {/* BOTTOM GRID: SETTLEMENTS & ACTIVITY FEED */}
          <div className="dashboard-grid">
            <Section
              title="Pending Settlements"
              onViewAll={() => navigate("/split/settlements")}
            >
              {settlementList.length === 0 ? (
                <EmptyState message="Everyone is all caught up!" />
              ) : (
                <div style={{ display: "grid", gap: "12px" }}>
                  {settlementList.map((s, i) => (
                    <div key={i} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: i === settlementList.length - 1 ? "none" : "1px solid rgba(255, 255, 255, 0.05)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1rem", color: "white" }}>
                        <span style={{ fontWeight: "700" }}>{s.from}</span>
                        <span style={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "0.85rem", fontWeight: "600", textTransform: "uppercase" }}>owes</span>
                        <span style={{ fontWeight: "700" }}>{s.to}</span>
                      </div>
                      <div style={{ fontWeight: "800", color: "#F87171", fontSize: "1.1rem" }}>₹{s.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </Section>

            <Section
              title="Activity Feed"
              icon={<FaHistory />}
              onViewAll={() => navigate("/split/expenses")}
            >
              {activities.length === 0 ? (
                <EmptyState message="No activity yet." />
              ) : (
                <div style={{ display: "grid", gap: "16px" }}>
                  {activities.slice(0, 5).map((activity, i) => (
                    <ActivityRow key={i} item={activity} />
                  ))}
                  <button
                    onClick={() => navigate("/split/expenses")}
                    style={{
                      marginTop: "16px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      padding: "12px",
                      borderRadius: "12px",
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.3s"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
                  >
                    View All Activities
                  </button>
                </div>
              )}
            </Section>
          </div>
        </div>

        {/* MODALS */}
        {activeModal === "export" && (
          <Modal title="Export Trip Data" icon={<FaDownload />} onClose={closeModal}>
            <div style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "4px" }}>
              <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.95rem", marginBottom: "32px", lineHeight: "1.6" }}>
                Choose what data you'd like to export from <strong style={{ color: "white" }}>{currentTripName}</strong>. All exports include timestamps and are formatted for easy sharing or analysis.
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "16px",
                marginBottom: "24px"
              }}>
                <ExportCard
                  icon={<FaReceipt />}
                  title="Expenses (PDF)"
                  count={expenses.length}
                  desc="All expense details with splits and categories"
                  onClick={handleExportExpenses}
                />
                <ExportCard
                  icon={<FaCreditCard />}
                  title="Payments (PDF)"
                  count={payments.length}
                  desc="All recorded payments between participants"
                  onClick={handleExportPayments}
                />
                <ExportCard
                  icon={<FaUsers />}
                  title="Participants (PDF)"
                  count={participants.length}
                  desc="Participant details with current balances"
                  onClick={handleExportParticipants}
                />
                <ExportCard
                  icon={<FaBalanceScale />}
                  title="Settlements (PDF)"
                  badge="Auto-calculated"
                  desc="Optimal payment instructions to settle debts"
                  onClick={handleExportSettlements}
                />
                <ExportCard
                  icon={<FaFileInvoiceDollar />}
                  title="Complete Report (PDF)"
                  badge="All data"
                  desc="Comprehensive report with all data and summaries"
                  onClick={handleExportFullReport}
                />
                <ExportCard
                  icon={<FaChartLine />}
                  title="All Data (Multiple Sheets)"
                  badge="Everything"
                  desc="Download all data consolidated in one PDF report"
                  onClick={handleExportFullReport}
                />
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginTop: "20px" }}>
                <ul style={{ color: "#888", fontSize: "0.8rem", paddingLeft: "16px", lineHeight: "1.8" }}>
                  <li>CSV files can be opened in Excel, Google Sheets, or any spreadsheet application</li>
                  <li>PDF reports are formatted for printing and sharing</li>
                  <li>JSON backup files can be used to restore your data</li>
                  <li>All exports include complete transaction history and timestamps</li>
                </ul>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                  <button
                    onClick={closeModal}
                    style={{
                      padding: "10px 32px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      background: "#fff",
                      fontWeight: "600",
                      cursor: "pointer",
                      color: "#333"
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {activeModal === "addParticipant" && (
          <Modal title="Add Participant" icon={<FaUserPlus />} onClose={closeModal}>
            <div style={{ display: "grid", gap: "20px" }}>
              <Input inputRef={partNameRef} label="Name *" placeholder="Enter participant name" />
              <Input label="Email (optional)" placeholder="Enter email address" />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button onClick={closeModal} style={cancelBtnStyle}>Cancel</button>
                <button onClick={handleAddParticipant} style={actionBtnStyle}>Add Participant</button>
              </div>
            </div>
          </Modal>
        )}

        {activeModal === "addExpense" && (
          <Modal title="Add Expense" icon={<FaReceipt />} onClose={closeModal} maxWidth="900px">
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "24px" : "32px",
              padding: isMobile ? "0" : "10px"
            }}>
              {/* LEFT COLUMN: BASIC INFO */}
              <div style={{ flex: 1, display: "grid", gap: "16px" }}>
                <Input label="Expense Title *" placeholder="What was this expense for?" inputRef={expDescRef} />
                <Input
                  label="Amount (INR) *"
                  placeholder="Enter amount"
                  type="number"
                  value={expAmount}
                  onChange={(e: any) => setExpAmount(e.target.value)}
                />
                <Select dropdown label="Paid by *" value={expPayer} options={participants.map(p => p.name)} onChange={(val: string) => setExpPayer(val)} />
                <Input label="Date *" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                {!isMobile && <Input label="Category (optional)" placeholder="e.g., Food, Transport, Accommodation" />}
              </div>

              {/* RIGHT COLUMN: SPLIT DETAILS */}
              <div style={{ flex: 1.2, display: "flex", flexDirection: "column" }}>
                <label style={labelStyle}>How should this be divided?</label>
                <div style={{ display: "flex", gap: "8px", marginTop: "12px", marginBottom: "20px" }}>
                  <button
                    onClick={() => setSplitType('equal')}
                    style={{
                      flex: 1, padding: "14px", borderRadius: "14px",
                      borderColor: splitType === 'equal' ? "#7C3AED" : "rgba(255,255,255,0.05)",
                      background: splitType === 'equal' ? "rgba(124, 58, 237, 0.2)" : "rgba(255,255,255,0.02)",
                      color: splitType === 'equal' ? "white" : "rgba(255,255,255,0.4)",
                      cursor: "pointer", fontSize: "0.85rem", fontWeight: "800", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", transition: "all 0.3s", border: "1px solid"
                    }}
                  >
                    <FaUsers size={18} /> EQUAL
                  </button>
                  <button
                    onClick={() => setSplitType('percentage')}
                    style={{
                      flex: 1, padding: "14px", borderRadius: "14px",
                      borderColor: splitType === 'percentage' ? "#7C3AED" : "rgba(255,255,255,0.05)",
                      background: splitType === 'percentage' ? "rgba(124, 58, 237, 0.2)" : "rgba(255,255,255,0.02)",
                      color: splitType === 'percentage' ? "white" : "rgba(255,255,255,0.4)",
                      cursor: "pointer", fontSize: "0.85rem", fontWeight: "800", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", transition: "all 0.3s", border: "1px solid"
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>%</span> PERCENT
                  </button>
                  <button
                    onClick={() => setSplitType('custom')}
                    style={{
                      flex: 1, padding: "14px", borderRadius: "14px",
                      borderColor: splitType === 'custom' ? "#7C3AED" : "rgba(255,255,255,0.05)",
                      background: splitType === 'custom' ? "rgba(124, 58, 237, 0.2)" : "rgba(255,255,255,0.02)",
                      color: splitType === 'custom' ? "white" : "rgba(255,255,255,0.4)",
                      cursor: "pointer", fontSize: "0.85rem", fontWeight: "800", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", transition: "all 0.3s", border: "1px solid"
                    }}
                  >
                    <FaMoneyBillWave size={18} /> CUSTOM
                  </button>
                </div>

                <div style={{
                  maxHeight: isMobile ? "200px" : "300px",
                  overflowY: "auto",
                  padding: "20px",
                  border: "1px solid rgba(124, 58, 237, 0.1)",
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.02)",
                  marginBottom: "20px"
                }}>
                  {participants.map((p, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i === participants.length - 1 ? "none" : "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <Avatar initial={p.initial} size={36} />
                        <span style={{ fontSize: "1rem", fontWeight: "700", color: "white" }}>{p.name}</span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {splitType === 'percentage' && (
                          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <input
                              type="number"
                              value={splitValues[p.name] ?? ""}
                              onChange={(e) => setSplitValues({ ...splitValues, [p.name]: e.target.value })}
                              style={{ ...inputStyle, width: "80px", paddingRight: "25px", textAlign: "right", fontSize: "0.9rem" }}
                            />
                            <span style={{ position: "absolute", right: "10px", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontWeight: "800" }}>%</span>
                          </div>
                        )}

                        {splitType === 'custom' && (
                          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <span style={{ position: "absolute", left: "10px", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontWeight: "800" }}>₹</span>
                            <input
                              type="number"
                              value={splitValues[p.name] ?? ""}
                              onChange={(e) => setSplitValues({ ...splitValues, [p.name]: e.target.value })}
                              style={{ ...inputStyle, width: "100px", paddingLeft: "18px", textAlign: "right", fontSize: "0.9rem" }}
                            />
                          </div>
                        )}

                        <div style={{ minWidth: "80px", textAlign: "right", color: "#FACC15", fontWeight: "800", fontSize: "1.1rem" }}>
                          ₹{splitType === 'equal'
                            ? (Number(expAmount) / participants.length || 0).toFixed(2)
                            : splitType === 'percentage'
                              ? ((Number(splitValues[p.name]) || 0) / 100 * Number(expAmount)).toFixed(2)
                              : (Number(splitValues[p.name]) || 0).toFixed(2)
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "stretch" : "center",
                  padding: "16px",
                  gap: "24px",
                  background: "rgba(124, 58, 237, 0.05)",
                  borderRadius: "16px",
                  border: "1px solid rgba(124, 58, 237, 0.1)"
                }}>
                  <div style={{ fontWeight: "800", color: "white", fontSize: "1.1rem", textAlign: isMobile ? "center" : "left" }}>
                    Total Split: <span style={{ color: "#FACC15" }}>₹{(Number(expAmount) || 0).toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                    <button onClick={closeModal} style={cancelBtnStyle}>Cancel</button>
                    <button onClick={handleAddExpense} style={actionBtnStyle}>Save Expense</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {activeModal === "recordPayment" && (
          <Modal title="Record Payment" icon={<FaMoneyBillWave />} onClose={closeModal}>
            <div style={{ display: "grid", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <Select dropdown label="From *" value={payFrom} options={participants.map(p => p.name)} onChange={(val: string) => setPayFrom(val)} />
                <Select dropdown label="To *" value={payTo} options={participants.map(p => p.name)} onChange={(val: string) => setPayTo(val)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <Input inputRef={payAmountRef} label="Amount (INR) *" placeholder="0.00" type="number" />
                <Input label="Date *" type="date" defaultValue={payDate} onChange={(e: any) => setPayDate(e.target.value)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={labelStyle}>Description (optional)</label>
                <textarea
                  ref={payDescRef}
                  style={{ ...inputStyle, height: "80px", resize: "none" }}
                  placeholder="What was this payment for?"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginTop: "20px" }}>
                <button onClick={closeModal} style={cancelBtnStyle}>Cancel</button>
                <button onClick={handleRecordPayment} style={actionBtnStyle}>Record Payment</button>
              </div>
            </div>
          </Modal>
        )}

        {activeModal === "finishTrip" && (
          <Modal title="Save & Finish Trip" icon={<FaCheck />} onClose={closeModal}>
            <div style={{ display: "grid", gap: "20px" }}>
              <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "1rem", margin: 0, lineHeight: "1.6" }}>
                Are you sure you want to finish <strong style={{ color: "white" }}>"{currentTripName}"</strong>? This will:
              </p>
              <ul style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.95rem", margin: 0, paddingLeft: "1.5rem", lineHeight: "1.8" }}>
                <li>Archive all expenses and settlements to <strong style={{ color: "white" }}>History</strong></li>
                <li>Clear the current dashboard</li>
                <li>Allow you to start fresh for your next trip</li>
              </ul>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginTop: "20px" }}>
                <button onClick={closeModal} style={cancelBtnStyle}>Cancel</button>
                <button
                  onClick={() => {
                    archiveCurrentTrip();
                    closeModal();
                    navigate("/split");
                  }}
                  style={{ ...actionBtnStyle, background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", boxShadow: "0 10px 20px rgba(16, 185, 129, 0.2)" }}
                >
                  Confirm & Finish
                </button>
              </div>
            </div>
          </Modal>
        )}

        {activeModal === "addNewTrip" && (
          <Modal title="Start New Trip" icon={<FaPlusCircle />} onClose={closeModal}>
            <div style={{ display: "grid", gap: "20px" }}>
              <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.95rem", margin: 0, lineHeight: "1.6" }}>
                Starting a new trip will save your current trip <strong style={{ color: "white" }}>"{currentTripName}"</strong> to History and clear the dashboard for a new beginning.
              </p>
              <Input inputRef={tripNameRef} label="Trip Name *" placeholder="e.g., Summer Vacay 2024" />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button onClick={closeModal} style={cancelBtnStyle}>Cancel</button>
                <button
                  onClick={() => {
                    const name = tripNameRef.current?.value;
                    if (name) {
                      startNewTrip(name);
                      closeModal();
                    } else {
                      alert("Please enter a trip name");
                    }
                  }}
                  style={actionBtnStyle}
                >
                  Create Trip
                </button>
              </div>
            </div>
          </Modal>
        )}

        {activeModal === "history" && (
          <Modal title={selectedHistoryTrip ? `History: ${selectedHistoryTrip.name}` : "Trip History"} icon={<FaHistory />} onClose={closeModal}>
            <div style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "4px" }}>
              {!selectedHistoryTrip ? (
                trips.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <FaHistory size={40} style={{ color: "#eee", marginBottom: "16px" }} />
                    <p style={{ color: "#888", margin: 0 }}>No past trips found.</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: "16px" }}>
                    {trips.map((trip: any) => (
                      <div
                        key={trip.id}
                        className="glass-card"
                        style={{
                          padding: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedHistoryTrip(trip)}
                      >
                        <div>
                          <h4 style={{ margin: 0, color: "white", fontSize: "1.1rem", fontWeight: "800", letterSpacing: "-0.5px" }}>{trip.name}</h4>
                          <p style={{ margin: "6px 0 0", color: "rgba(255, 255, 255, 0.4)", fontSize: "0.85rem", fontWeight: "600" }}>
                            {trip.date} • {trip.participants.length} MEMBERS • <span style={{ color: "#FACC15" }}>₹{trip.totalExpenses.toLocaleString()}</span>
                          </p>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              restoreTrip(trip.id);
                              closeModal();
                            }}
                            style={{
                              padding: "10px",
                              borderRadius: "12px",
                              border: "1px solid rgba(124, 58, 237, 0.2)",
                              background: "rgba(124, 58, 237, 0.1)",
                              color: "#C084FC",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.3s"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "rgba(124, 58, 237, 0.2)"}
                            onMouseOut={(e) => e.currentTarget.style.background = "rgba(124, 58, 237, 0.1)"}
                            title="Restore and Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTrip(trip.id);
                            }}
                            style={{
                              padding: "10px",
                              borderRadius: "12px",
                              border: "1px solid rgba(248, 113, 113, 0.2)",
                              background: "rgba(248, 113, 113, 0.1)",
                              color: "#F87171",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            title="Delete trip"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div style={{ display: "grid", gap: "24px" }}>
                  <button
                    onClick={() => setSelectedHistoryTrip(null)}
                    style={{ ...cancelBtnStyle, width: "fit-content", padding: "10px 20px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <FaArrowLeft size={12} /> Back to list
                  </button>

                  <div>
                    <h3 style={{ margin: "0 0 16px", fontSize: "1.2rem", color: "white", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "12px", fontWeight: "800", letterSpacing: "-0.5px" }}>PARTICIPANTS ({selectedHistoryTrip.participants.length})</h3>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {selectedHistoryTrip.participants.map((p: any, i: number) => (
                        <div key={i} className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <Avatar initial={p.initial} size={30} />
                            <span style={{ fontSize: "1rem", color: "white", fontWeight: "700" }}>{p.name}</span>
                          </div>
                          <span style={{ fontSize: "1.1rem", fontWeight: "800", color: p.amount >= 0 ? "#10B981" : "#F87171" }}>
                            {p.amount >= 0 ? `+₹${p.amount.toFixed(2)}` : `-₹${Math.abs(p.amount).toFixed(2)}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ margin: "0 0 16px", fontSize: "1.2rem", color: "white", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "12px", fontWeight: "800", letterSpacing: "-0.5px" }}>EXPENSES ({selectedHistoryTrip.expenses.length})</h3>
                    <div style={{ display: "grid", gap: "12px" }}>
                      {selectedHistoryTrip.expenses.length === 0 ? <p style={{ color: "rgba(255, 255, 255, 0.2)", fontSize: "1rem", fontWeight: "600" }}>No expenses recorded.</p> :
                        selectedHistoryTrip.expenses.map((e: any, i: number) => (
                          <div key={i} className="glass-card" style={{ padding: "16px 20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                              <span style={{ fontWeight: "800", color: "white", fontSize: "1.05rem" }}>{e.title}</span>
                              <span style={{ fontWeight: "900", color: "#FACC15", fontSize: "1.1rem" }}>₹{e.amount.toFixed(2)}</span>
                            </div>
                            <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.4)", fontWeight: "600" }}>
                              Paid by <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>{e.payer}</span> • {e.date}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {selectedHistoryTrip.payments.length > 0 && (
                    <div>
                      <h3 style={{ margin: "0 0 16px", fontSize: "1rem", color: "#333", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>Settlements ({selectedHistoryTrip.payments.length})</h3>
                      <div style={{ display: "grid", gap: "10px" }}>
                        {selectedHistoryTrip.payments.map((p: any, i: number) => (
                          <div key={i} style={{ fontSize: "0.85rem", padding: "8px 12px", borderRadius: "8px", border: "1px solid #f0f0f0" }}>
                            <span style={{ fontWeight: "600" }}>{p.from}</span> paid <span style={{ fontWeight: "600" }}>{p.to}</span>
                            <div style={{ marginTop: "4px", color: "#00b2a9", fontWeight: "700" }}>₹{p.amount.toFixed(2)}</div>
                            {p.description && <div style={{ fontSize: "0.75rem", color: "#aaa", fontStyle: "italic", marginTop: "2px" }}>"{p.description}"</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
      <QuickSOS />
    </>
  );
}

// STYLES
const labelStyle = { fontSize: "0.9rem", fontWeight: "600", color: "rgba(255, 255, 255, 0.7)", display: "block" };
const inputStyle = { padding: "12px 16px", borderRadius: "12px", border: "1px solid rgba(124, 58, 237, 0.2)", fontSize: "0.95rem", outline: "none", width: "100%", background: "rgba(255, 255, 255, 0.05)", color: "white" };
const actionBtnStyle = { background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontWeight: "700", boxShadow: "0 10px 20px rgba(124, 58, 237, 0.3)" };
const cancelBtnStyle = { background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontWeight: "600", color: "rgba(255, 255, 255, 0.6)" };

// COMPONENTS
function HeaderButton({ icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(124, 58, 237, 0.2)",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        color: "white",
        fontWeight: "600",
        fontSize: "0.9rem",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "rgba(124, 58, 237, 0.1)";
        e.currentTarget.style.borderColor = "#7C3AED";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
        e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.2)";
      }}
    >
      <span style={{ color: "#FACC15" }}>{icon}</span> {label}
    </button>
  );
}

function StatCard({ label, value, icon }: any) {
  const isMobile = useIsMobile();
  return (
    <div className="glass-card" style={{
      padding: isMobile ? "16px" : "24px",
      position: "relative",
      overflow: "hidden"
    }}>
      {!isMobile && <div style={{ color: "rgba(124, 58, 237, 0.3)", fontSize: "1.5rem", position: "absolute", top: "20px", right: "20px" }}>{icon}</div>}
      <p style={{ margin: "0 0 12px", color: "rgba(255, 255, 255, 0.5)", fontSize: "0.85rem", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</p>
      <h2 style={{ margin: 0, fontSize: isMobile ? "1.4rem" : "1.8rem", color: "white", fontWeight: "800", letterSpacing: "-0.5px" }}>{value}</h2>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "3px", background: "linear-gradient(90deg, #7C3AED, transparent)" }} />
    </div>
  );
}

function QuickAction({ icon, title, desc, onClick }: any) {
  const isMobile = useIsMobile();
  return (
    <div
      onClick={onClick}
      className="glass-card"
      style={{
        padding: isMobile ? "16px" : "20px",
        display: "flex",
        alignItems: "center",
        gap: isMobile ? "12px" : "18px",
        cursor: "pointer",
      }}
    >
      <div style={{
        color: "#FACC15",
        fontSize: "1.3rem",
        background: "rgba(250, 204, 21, 0.1)",
        width: "50px",
        height: "50px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(250, 204, 21, 0.2)"
      }}>
        {icon}
      </div>
      <div>
        <h4 style={{ margin: 0, fontSize: "1rem", color: "white", fontWeight: "700" }}>{title}</h4>
        <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.4)" }}>{desc}</p>
      </div>
    </div>
  );
}

function Section({ title, icon, onAdd, onViewAll, children }: any) {
  const isMobile = useIsMobile();
  return (
    <div className="glass-card" style={{ padding: isMobile ? "20px" : "28px", minHeight: "220px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {icon && <span style={{ color: "#C084FC", fontSize: "1.2rem" }}>{icon}</span>}
          <h3 style={{ margin: 0, fontSize: "1.2rem", color: "white", fontWeight: "800", letterSpacing: "-0.5px" }}>{title}</h3>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {onAdd && (
            <button onClick={onAdd} style={{ background: "rgba(124, 58, 237, 0.15)", color: "#C084FC", border: "1px solid rgba(124, 58, 237, 0.3)", padding: "8px 16px", borderRadius: "10px", fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: "700" }}>
              <FaPlus size={10} /> Add
            </button>
          )}
          {onViewAll && (
            <button onClick={onViewAll} style={{ background: "rgba(255, 255, 255, 0.05)", color: "rgba(255, 255, 255, 0.6)", border: "none", padding: "8px 16px", borderRadius: "10px", fontSize: "0.85rem", cursor: "pointer", fontWeight: "600" }}>
              View All
            </button>
          )}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {children}
      </div>
    </div>
  );
}

function ParticipantRow({ participant }: any) {
  const isBack = participant.status === "gets back";
  const isSettled = participant.status === "settled";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <Avatar initial={participant.initial} />
        <span style={{ fontWeight: "600", color: "white", fontSize: "1rem" }}>{participant.name}</span>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontWeight: "800", color: isSettled ? "rgba(255,255,255,0.2)" : isBack ? "#10B981" : "#F87171", fontSize: "1.1rem" }}>
          {isSettled ? "Settled" : `₹${Math.abs(participant.amount).toFixed(2)}`}
        </div>
        {!isSettled && <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.4)", fontWeight: "600", textTransform: "uppercase" }}>{participant.status}</div>}
      </div>
    </div>
  );
}

function ExpenseRow({ expense }: any) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
      <div>
        <h4 style={{ margin: 0, fontSize: "1rem", color: "white", fontWeight: "700" }}>{expense.title}</h4>
        <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.4)" }}>
          Paid by <span style={{ color: "#FACC15", fontWeight: "600" }}>{expense.payer}</span> • {expense.date}
        </p>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontWeight: "800", color: "white", fontSize: "1.1rem" }}>₹{expense.amount.toFixed(2)}</div>
        <div style={{ fontSize: "0.75rem", color: "#C084FC", fontWeight: "700", textTransform: "uppercase" }}>{expense.splitType}</div>
      </div>
    </div>
  );
}

function ActivityRow({ item }: { item: any }) {
  let icon = <FaHistory />;
  let color = "#C084FC";
  let bgColor = "rgba(192, 132, 252, 0.1)";

  if (item.type === 'expense_added') {
    icon = <FaReceipt />;
    color = "#FACC15";
    bgColor = "rgba(250, 204, 21, 0.1)";
  } else if (item.type === 'payment_recorded') {
    icon = <FaCheckCircle />;
    color = "#10B981";
    bgColor = "rgba(16, 185, 129, 0.1)";
  } else if (item.type === 'member_joined') {
    icon = <FaUserFriends />;
    color = "#818CF8";
    bgColor = "rgba(129, 140, 248, 0.1)";
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: bgColor,
          color: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          border: `1px solid ${color}33`
        }}>
          {icon}
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: "1rem", color: "white", fontWeight: "700" }}>{item.title}</h4>
          <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.4)" }}>
            {item.description}
          </p>
          <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.3)", marginTop: "4px", fontWeight: "600" }}>
            {item.date} • {item.type.replace('_', ' ').toUpperCase()}
          </div>
        </div>
      </div>
      {item.amount && (
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: "800", color: color, fontSize: "1.1rem" }}>
            ₹{item.amount.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

function Avatar({ initial, size = 36 }: any) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: "12px",
      background: "linear-gradient(135deg, #7C3AED, #C084FC)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.45,
      fontWeight: "800",
      textTransform: "uppercase",
      boxShadow: "0 4px 10px rgba(124, 58, 237, 0.3)"
    }}>
      {initial}
    </div>
  );
}


function Input({ label, placeholder, type = "text", value, defaultValue, inputRef, onChange }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      <label style={labelStyle}>{label}</label>
      <input
        ref={inputRef}
        type={type}
        value={value}
        defaultValue={defaultValue}
        style={inputStyle}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

function Select({ label, value, options, dropdown, onChange }: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
      <label style={labelStyle}>{label}</label>
      <div
        onClick={() => dropdown && setIsOpen(!isOpen)}
        style={{ ...inputStyle, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: dropdown ? "pointer" : "default" }}
      >
        <span style={{ color: value?.includes("Select") || value?.includes("Who") || !value ? "rgba(255,255,255,0.3)" : "white" }}>{value || "Select..."}</span>
        {dropdown && <FaChevronDown size={12} color="#FACC15" />}
      </div>
      {isOpen && options && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          background: "#1A1429",
          border: "1px solid rgba(124, 58, 237, 0.3)",
          borderRadius: "14px",
          marginTop: "8px",
          zIndex: 100,
          maxHeight: "200px",
          overflowY: "auto",
          boxShadow: "0 15px 30px rgba(0,0,0,0.4)"
        }}>
          {options.map((opt: string) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              style={{ padding: "12px 16px", cursor: "pointer", fontSize: "0.95rem", color: "white", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(124, 58, 237, 0.2)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "none")}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExportCard({ icon, title, count, desc, badge, onClick }: any) {
  return (
    <div
      className="glass-card"
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "rgba(124, 58, 237, 0.1)",
          color: "#C084FC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
          border: "1px solid rgba(124, 58, 237, 0.2)"
        }}>
          {icon}
        </div>
        {(count !== undefined || badge) && (
          <span style={{
            background: "rgba(250, 204, 21, 0.1)",
            color: "#FACC15",
            padding: "4px 12px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontWeight: "800",
            border: "1px solid rgba(250, 204, 21, 0.2)"
          }}>
            {badge || count}
          </span>
        )}
      </div>
      <div>
        <h4 style={{ margin: "0 0 6px", fontSize: "1.05rem", color: "white", fontWeight: "700" }}>{title}</h4>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.4)", lineHeight: "1.5" }}>{desc}</p>
      </div>
      <button
        onClick={onClick}
        style={{
          marginTop: "6px",
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid rgba(124, 58, 237, 0.3)",
          background: "rgba(124, 58, 237, 0.1)",
          color: "white",
          fontSize: "0.9rem",
          fontWeight: "700",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          transition: "all 0.3s"
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "rgba(124, 58, 237, 0.2)")}
        onMouseOut={(e) => (e.currentTarget.style.background = "rgba(124, 58, 237, 0.1)")}
      >
        <FaDownload size={14} /> Export Report
      </button>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", padding: "40px 0" }}>
      <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: "600" }}>{message}</p>
    </div>
  );
}

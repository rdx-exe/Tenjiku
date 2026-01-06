import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaHistory, FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
import QuickSOS from "../../../components/QuickSOS";
import Modal from "../../../components/Modal";
import { useSplit } from "../SplitContext";
import { useState, useRef, useEffect } from "react";

export default function SplitLanding() {
    const navigate = useNavigate();
    const { startNewTrip, participants, expenses, currentTripName } = useSplit();

    useEffect(() => {
        // If there's active data or a named trip that isn't finished/reset
        const hasData = participants.length > 0 || expenses.length > 0;
        const isNamedTrip = currentTripName !== "My Trip";

        if (hasData || isNamedTrip) {
            navigate("/split/dashboard");
        }
    }, [participants, expenses, currentTripName, navigate]);

    // Local state for the "New Trip" modal
    const [showNewTripModal, setShowNewTripModal] = useState(false);
    const tripNameRef = useRef<HTMLInputElement>(null);

    const handleStartNewTrip = () => {
        const name = tripNameRef.current?.value;
        if (name) {
            startNewTrip(name);
            navigate("/split/dashboard");
        } else {
            alert("Please enter a trip name");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0A0510",
                backgroundImage: `
                    radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.15) 0px, transparent 50%),
                    radial-gradient(at 100% 100%, rgba(192, 132, 252, 0.1) 0px, transparent 50%)
                `,
                fontFamily: "'Outfit', sans-serif",
                position: "relative",
                overflow: "hidden",
                color: "white"
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap');
                
                .landing-btn {
                    padding: 50px 40px;
                    border-radius: 36px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(124, 58, 237, 0.2);
                    backdrop-filter: blur(16px);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: center;
                    width: 320px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    color: white;
                }

                .landing-btn:hover {
                    background: rgba(124, 58, 237, 0.1);
                    border-color: #7C3AED;
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(124, 58, 237, 0.2);
                }

                .icon-box {
                    width: 90px;
                    height: 90px;
                    border-radius: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    transition: all 0.5s;
                }

                .landing-btn:hover .icon-box {
                    transform: scale(1.1) rotate(5deg);
                }

                .new-trip-icon {
                    background: rgba(124, 58, 237, 0.1);
                    color: #C084FC;
                    border: 1px solid rgba(124, 58, 237, 0.2);
                }

                .history-icon {
                    background: rgba(250, 204, 21, 0.1);
                    color: #FACC15;
                    border: 1px solid rgba(250, 204, 21, 0.2);
                }

                .gradient-text {
                    background: linear-gradient(135deg, #FFF 0%, #C084FC 50%, #FACC15 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 900;
                }

                .back-home-btn {
                    position: absolute;
                    top: 40px;
                    left: 40px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(124, 58, 237, 0.2);
                    color: white;
                    cursor: pointer;
                    font-weight: 600;
                    padding: 12px 24px;
                    border-radius: 14px;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s;
                }

                .back-home-btn:hover {
                    background: rgba(124, 58, 237, 0.2);
                    border-color: #7C3AED;
                    transform: translateX(-5px);
                }
            `}</style>

            <button onClick={() => navigate("/")} className="back-home-btn">
                <FaArrowLeft />
                <span>Back to Home</span>
            </button>

            <div style={{ textAlign: "center", marginBottom: "60px" }}>
                <div style={{
                    width: "80px",
                    height: "80px",
                    background: "rgba(124, 58, 237, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 28px",
                    color: "#FACC15",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                    boxShadow: "0 0 30px rgba(124, 58, 237, 0.2)"
                }}>
                    <FaMoneyBillWave size={40} />
                </div>
                <h1 className="gradient-text" style={{ fontSize: "3.5rem", margin: "0 0 16px", letterSpacing: "-1px" }}>Split Expenses</h1>
                <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "1.2rem", fontWeight: 500 }}>Manage and track shared travel expenses efficiently</p>
            </div>

            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 2 }}>
                <div className="landing-btn" onClick={() => setShowNewTripModal(true)}>
                    <div className="icon-box new-trip-icon"><FaPlusCircle /></div>
                    <div style={{ textAlign: "center" }}>
                        <span style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "1px" }}>NEW TRIP</span>
                        <p style={{ margin: "12px 0 0", color: "rgba(255, 255, 255, 0.4)", fontWeight: "400", fontSize: "0.95rem", lineHeight: 1.5 }}>
                            Start a fresh expense record<br />for your new adventure
                        </p>
                    </div>
                </div>

                <div className="landing-btn" onClick={() => navigate("/split/dashboard?view=history")}>
                    <div className="icon-box history-icon"><FaHistory /></div>
                    <div style={{ textAlign: "center" }}>
                        <span style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "1px" }}>TRIP HISTORY</span>
                        <p style={{ margin: "12px 0 0", color: "rgba(255, 255, 255, 0.4)", fontWeight: "400", fontSize: "0.95rem", lineHeight: 1.5 }}>
                            Review and manage all<br />your previous trip finances
                        </p>
                    </div>
                </div>
            </div>

            {showNewTripModal && (
                <Modal
                    title="Start New Trip"
                    onClose={() => setShowNewTripModal(false)}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <label style={{ fontSize: "0.9rem", fontWeight: "700", color: "rgba(255, 255, 255, 0.7)" }}>Trip Name *</label>
                        <input
                            ref={tripNameRef}
                            type="text"
                            placeholder="Enter trip name (e.g. Manali 2024)"
                            style={inputStyle}
                            onKeyPress={(e) => e.key === "Enter" && handleStartNewTrip()}
                            autoFocus
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginTop: "32px" }}>
                        <button
                            onClick={() => setShowNewTripModal(false)}
                            style={{
                                background: "transparent",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                padding: "12px 24px",
                                borderRadius: "12px",
                                cursor: "pointer",
                                color: "white",
                                fontWeight: 600
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleStartNewTrip}
                            style={{
                                background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                                color: "#fff",
                                border: "none",
                                padding: "12px 32px",
                                borderRadius: "12px",
                                cursor: "pointer",
                                fontWeight: "700",
                                boxShadow: "0 10px 20px rgba(124, 58, 237, 0.3)"
                            }}
                        >
                            Create Trip
                        </button>
                    </div>
                </Modal>
            )}

            <QuickSOS />
        </div>
    );
}


const inputStyle: React.CSSProperties = {
    padding: "16px 20px",
    borderRadius: "16px",
    border: "1px solid rgba(124, 58, 237, 0.2)",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(255, 255, 255, 0.05)",
    color: "white"
};

import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaUsers, FaCompass, FaMoneyBillWave, FaArrowLeft, FaWallet, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import QuickSOS from "../../../components/QuickSOS";
import Modal from "../../../components/Modal";
import { motion } from "framer-motion";

export default function PlanningHome() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const showDestinations = searchParams.get("view") === "destinations";
  const tripType = searchParams.get("type") as "solo" | "group" | null;

  // Form Refs
  const groupSizeRef = useRef<HTMLInputElement>(null);
  const startCityRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);

  const handleTripSelect = (type: "solo" | "group") => {
    setSearchParams({ view: "destinations", type });
  };

  const handleBack = () => {
    if (showDestinations) {
      setSearchParams({});
      setSelectedCategory(null);
    } else {
      navigate("/");
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFindTrip = () => {
    const data = {
      category: selectedCategory,
      type: tripType,
      groupSize: groupSizeRef.current?.value || "1",
      days: "3", // Default to 3 days since user removed input
      city: startCityRef.current?.value,
      budget: budgetRef.current?.value,
    };

    if (!data.city || !data.budget) {
      alert("Please fill in all required fields!");
      return;
    }

    navigate("/planning/result", { state: data });
    setSelectedCategory(null);
  };

  const commonStyles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');

      .planning-container {
        min-height: 100dvh;
        width: 100%;
        background-color: #0A0510;
        background-image: 
            radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.12) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(192, 132, 252, 0.08) 0px, transparent 50%);
        font-family: 'Outfit', sans-serif;
        color: white;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .btn-glass {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(12px);
        padding: 10px 18px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
      }
      .btn-glass:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
      }

      .btn-primary {
        background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
        color: white;
        border: none;
        padding: 16px 36px;
        border-radius: 50px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
      }
      .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(124, 58, 237, 0.4);
      }

      .category-card {
        width: 260px;
        height: 180px;
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(124, 58, 237, 0.1);
        border-radius: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
        padding: 24px;
        position: relative;
      }
      .category-card:hover {
        background: rgba(124, 58, 237, 0.1);
        border-color: #C084FC;
        transform: translateY(-8px);
      }

      .selection-card {
        padding: 40px 30px;
        border-radius: 32px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(124, 58, 237, 0.2);
        backdrop-filter: blur(16px);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
        width: min(100%, 320px);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }
      .selection-card:hover {
        background: rgba(124, 58, 237, 0.05);
        border-color: #7C3AED;
        transform: translateY(-10px);
      }

      .gradient-text {
        background: linear-gradient(135deg, #FFF 0%, #C084FC 50%, #7C3AED 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .yellow-accent {
        color: #FACC15;
      }

      .float-anim {
        animation: float 5s ease-in-out infinite;
      }
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }

      .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @media (max-width: 768px) {
        .category-card {
          width: 100%;
          height: 130px;
        }
        .title-main {
          font-size: 2.2rem !important;
        }
        .header-top {
          padding: 15px !important;
        }
      }

      .input-field {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(124, 58, 237, 0.2);
        border-radius: 16px;
        padding: 16px 16px 16px 48px;
        color: white;
        width: 100%;
        outline: none;
        font-family: 'Outfit', sans-serif;
      }
    `}</style>
  );

  return (
    <div className="planning-container">
      {commonStyles}

      {/* Universal Header Bar */}
      <div className="header-top" style={{
        width: "100%",
        maxWidth: "1200px",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000
      }}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="btn-glass"
          style={{ zIndex: 1001 }}
        >
          <FaArrowLeft size={12} /> Back
        </motion.button>

        {showDestinations && tripType === "group" && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/split")}
            className="btn-glass"
            style={{ borderColor: '#FACC15', color: '#FACC15' }}
          >
            <FaMoneyBillWave /> Splitwise
          </motion.button>
        )}
      </div>

      <div style={{
        width: "100%",
        maxWidth: "1200px",
        padding: "20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }} className="fade-in">

        {!showDestinations ? (
          // SELECTION SECTION
          <div style={{ textAlign: "center", marginTop: "20px", width: '100%' }}>
            <div className="float-anim" style={{
              width: "100px",
              height: "100px",
              background: "rgba(124, 58, 237, 0.15)",
              borderRadius: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 40px",
              color: "#FACC15",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              boxShadow: "0 15px 40px rgba(124, 58, 237, 0.2)"
            }}>
              <FaCompass size={50} />
            </div>

            <h1 className="gradient-text title-main" style={{ fontSize: "3.5rem", fontWeight: "900", marginBottom: "16px", letterSpacing: "-1px" }}>
              Begin Your journey
            </h1>
            <p style={{ color: "#94A3B8", fontSize: "1.2rem", marginBottom: "60px", fontWeight: "400", padding: '0 20px' }}>
              Choose your travel style to unlock <span className="yellow-accent">curated adventures</span>
            </p>

            <div style={{ display: "flex", gap: "25px", flexWrap: "wrap", justifyContent: "center", width: '100%' }}>
              <div className="selection-card" onClick={() => handleTripSelect("solo")}>
                <div style={{ fontSize: "4rem" }}>👤</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#FACC15" }}>SOLO EXPLORER</h3>
                <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: "1.6" }}>Forge your own path across the Indian landscape.</p>
              </div>

              <div className="selection-card" onClick={() => handleTripSelect("group")}>
                <div style={{ fontSize: "4rem" }}>👥</div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#C084FC" }}>GROUP SQUAD</h3>
                <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: "1.6" }}>Create lasting memories with your crew.</p>
              </div>
            </div>
          </div>
        ) : (
          // DESTINATIONS SECTION
          <div style={{ width: '100%', textAlign: "center" }}>
            <div style={{ marginBottom: "60px" }}>
              <h1 className="gradient-text title-main" style={{ fontSize: "3.5rem", fontWeight: "900", marginBottom: "12px", letterSpacing: "-1px" }}>
                Explore India
              </h1>
              <p style={{ color: "#94A3B8", fontSize: "1.1rem", fontWeight: "400" }}>
                Where every mile tells a <span className="yellow-accent">vibrant story</span>
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", width: '100%' }}>
              {[
                { name: "Spiritual India", icon: "✨" },
                { name: "Heritage India", icon: "🏛️" },
                { name: "Nature & Mountains", icon: "🏞️" },
                { name: "City Explorer", icon: "🏙️" },
              ].map((cat) => (
                <div
                  key={cat.name}
                  className="category-card"
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>{cat.icon}</div>
                  <div style={{ fontWeight: "700", fontSize: "1.2rem" }}>{cat.name}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "80px" }}>
              <button className="btn-primary"
                onClick={() => handleCategoryClick("Custom Adventure")}
                style={{ fontSize: "1.1rem", padding: "18px 45px" }}>
                <FaWallet style={{ marginRight: "12px" }} /> Plan Trip with My Budget
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedCategory && (
        <Modal title={`Customize: ${selectedCategory}`} onClose={() => setSelectedCategory(null)}>
          <div style={{ display: "grid", gap: "24px" }}>
            <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: "1.6" }}>
              Customize your <span className="yellow-accent">{tripType}</span> trip.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: tripType === "group" ? "1fr 1fr" : "1fr", gap: "15px" }}>
              {tripType === "group" && (
                <div className="input-group">
                  <label style={labelStyle}>Group Size *</label>
                  <div style={{ position: "relative" }}>
                    <FaUsers style={iconStyle} />
                    <input ref={groupSizeRef} type="number" min="2" defaultValue="2" className="input-field" />
                  </div>
                </div>
              )}
              {/* Duration input removed as per request */}
            </div>

            <div className="input-group">
              <label style={labelStyle}>Starting From *</label>
              <div style={{ position: "relative" }}>
                <FaMapMarkerAlt style={iconStyle} />
                <input ref={startCityRef} type="text" placeholder="e.g. Bengaluru" className="input-field" />
              </div>
            </div>

            <div className="input-group">
              <label style={labelStyle}>Budget (INR) *</label>
              <div style={{ position: "relative" }}>
                <FaRupeeSign style={iconStyle} />
                <input ref={budgetRef} type="number" placeholder="50000" className="input-field" />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
              <button onClick={() => setSelectedCategory(null)} className="btn-glass" style={{ flex: 1, justifyContent: "center" }}>
                Cancel
              </button>
              <button onClick={handleFindTrip} className="btn-primary" style={{ flex: 2, padding: "12px" }}>
                Find Trip
              </button>
            </div>
          </div>
        </Modal>
      )}

      <QuickSOS />
    </div>
  );
}

// STYLES & COMPONENTS
const labelStyle = {
  fontSize: "0.8rem",
  fontWeight: "700",
  color: "#94A3B8",
  display: "block",
  textAlign: "left" as const,
  marginBottom: "8px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px"
};

const iconStyle: React.CSSProperties = {
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#7C3AED",
  fontSize: "1.1rem",
  zIndex: 1
};


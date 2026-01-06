import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    FaArrowLeft,
    FaMapMarkerAlt,
    FaClock,
    FaStar,
    FaLightbulb,
    FaExclamationCircle,
    FaRoute,
    FaSuitcaseRolling,
    FaTimes
} from 'react-icons/fa';
import MapView from '../components/MapView';
import { planTrip, type PlanTripResult } from '../lib/budgetLogic';

interface PlanningState {
    category: string;
    type: string;
    groupSize: string;
    days: string;
    city: string;
    budget: string;
}

const TripResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Initialize state from location but allow local updates
    const [currentParams, setCurrentParams] = useState<PlanningState | null>(location.state as PlanningState);

    const [loading, setLoading] = useState(true);
    const [destinations, setDestinations] = useState<PlanTripResult[]>([]);
    const [selectedDest, setSelectedDest] = useState<string | undefined>(undefined);
    const [isMobileMapOpen, setIsMobileMapOpen] = useState(false);

    // Budget Editing State
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [showBudgetMenu, setShowBudgetMenu] = useState(false); // New menu state
    const [tempBudget, setTempBudget] = useState("");
    const budgetInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!currentParams) {
            navigate('/planning');
            return;
        }

        const fetchTrips = async () => {
            setLoading(true);
            try {
                // Explicitly parse and pass all 5 arguments required by planTrip
                const city = currentParams.city || "";
                const budget = parseInt(currentParams.budget) || 0;
                const days = parseInt(currentParams.days) || 1;
                const people = parseInt(currentParams.groupSize) || 1;
                const category = currentParams.category || "City Explorer";

                const results = await planTrip(
                    city,
                    budget,
                    days,
                    people,
                    category
                );

                setDestinations(results);
                if (results.length > 0) {
                    setSelectedDest(results[0].name);
                }
            } catch (error) {
                console.error("Error planning trip:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [currentParams, navigate]);

    // Focus input when editing starts
    useEffect(() => {
        if (isEditingBudget && budgetInputRef.current) {
            budgetInputRef.current.focus();
        }
    }, [isEditingBudget]);

    // Close menu when clicking outside (simple implementation)
    useEffect(() => {
        const closeMenu = () => setShowBudgetMenu(false);
        if (showBudgetMenu) {
            window.addEventListener('click', closeMenu);
        }
        return () => window.removeEventListener('click', closeMenu);
    }, [showBudgetMenu]);

    const startCity = currentParams?.city || "Your City";
    const totalBudget = currentParams?.budget || "0";

    const handleSelectDest = (name: string) => {
        setSelectedDest(name);
        if (window.innerWidth <= 768) {
            setIsMobileMapOpen(true);
        }
    };

    const handleBudgetClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent immediate close
        setShowBudgetMenu(!showBudgetMenu);
        setIsEditingBudget(false);
    };

    const handlePresetSelect = (amount: string) => {
        setCurrentParams(prev => prev ? { ...prev, budget: amount } : null);
        setShowBudgetMenu(false);
    };

    const handleCustomClick = () => {
        setTempBudget(totalBudget);
        setIsEditingBudget(true);
        setShowBudgetMenu(false);
    };

    const handleBudgetSubmit = () => {
        if (tempBudget && tempBudget !== totalBudget) {
            setCurrentParams(prev => prev ? { ...prev, budget: tempBudget } : null);
        }
        setIsEditingBudget(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleBudgetSubmit();
        } else if (e.key === 'Escape') {
            setIsEditingBudget(false);
        }
    };

    return (
        <div className="trip-container">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&display=swap');

                .trip-container {
                    min-height: 100vh;
                    background-color: #0A0510;
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(192, 132, 252, 0.1) 0px, transparent 50%);
                    font-family: 'Outfit', sans-serif;
                    display: flex;
                    flex-direction: column;
                    color: white;
                    overflow: hidden;
                }

                .trip-header {
                    padding: 15px 40px;
                    background: rgba(10, 5, 20, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(124, 58, 237, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .back-btn {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(124, 58, 237, 0.3);
                    padding: 10px 18px;
                    border-radius: 14px;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                    transition: all 0.3s;
                }
                .back-btn:hover {
                    background: rgba(124, 58, 237, 0.2);
                    border-color: #7C3AED;
                    transform: translateX(-5px);
                }

                .brand-logo {
                    font-weight: 900;
                    font-size: 1.5rem;
                    background: linear-gradient(135deg, #FFF 0%, #C084FC 50%, #FACC15 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: 1px;
                }

                .budget-wrapper {
                    position: relative;
                    z-index: 101;
                }

                .budget-tag {
                    background: rgba(250, 204, 21, 0.1);
                    border: 1px solid rgba(250, 204, 21, 0.3);
                    padding: 8px 16px;
                    border-radius: 12px;
                    color: #FACC15;
                    font-weight: 700;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                    min-width: 140px;
                    justify-content: center;
                }
                .budget-tag:hover {
                    background: rgba(250, 204, 21, 0.2);
                    transform: scale(1.02);
                }

                .budget-menu {
                    position: absolute;
                    top: 120%;
                    right: 0;
                    background: rgba(10, 5, 20, 0.95);
                    border: 1px solid rgba(124, 58, 237, 0.3);
                    border-radius: 16px;
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    width: 180px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    backdrop-filter: blur(20px);
                    animation: slideDown 0.2s ease-out;
                }
                
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .budget-option {
                    padding: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #CBD5E1;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }
                .budget-option:hover {
                    background: rgba(124, 58, 237, 0.2);
                    color: white;
                }
                .budget-option span:last-child {
                    font-weight: bold;
                    color: #FACC15;
                }

                .budget-input {
                    background: transparent;
                    border: none;
                    color: #FACC15;
                    font-family: inherit;
                    font-weight: 700;
                    font-size: 0.9rem;
                    width: 80px;
                    outline: none;
                    border-bottom: 2px solid #FACC15;
                    padding: 0 4px;
                }

                .content-layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    flex: 1;
                    height: calc(100vh - 75px);
                }

                .cards-section {
                    padding: 40px;
                    overflow-y: auto;
                    background: rgba(0, 0, 0, 0.2);
                    scrollbar-width: none;
                }
                .cards-section::-webkit-scrollbar {
                    display: none;
                }

                .map-section {
                    position: relative;
                    background: #120C1F;
                }

                .card-item {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(124, 58, 237, 0.1);
                    border-radius: 24px;
                    padding: 24px;
                    margin-bottom: 24px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }
                .card-item:hover {
                    background: rgba(124, 58, 237, 0.08);
                    border-color: rgba(124, 58, 237, 0.4);
                    transform: translateY(-5px);
                }
                .card-item.selected {
                    background: rgba(124, 58, 237, 0.15);
                    border-color: #7C3AED;
                    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.2);
                }
                .card-item.selected::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 4px;
                    height: 100%;
                    background: #FACC15;
                }

                .card-image {
                    width: 100%;
                    height: 200px;
                    border-radius: 16px;
                    object-fit: cover;
                    margin-bottom: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .dest-name {
                    font-size: 1.4rem;
                    font-weight: 800;
                    margin-bottom: 8px;
                    color: white;
                }

                .dest-desc {
                    color: #94A3B8;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 16px;
                }

                .info-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 6px 12px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    color: #CBD5E1;
                    margin-right: 10px;
                    margin-bottom: 10px;
                }

                .rating-pill {
                    background: rgba(250, 204, 21, 0.1);
                    color: #FACC15;
                }

                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(124, 58, 237, 0.1);
                    border-top: 3px solid #7C3AED;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Mobile overrides */
                @media (max-width: 1024px) {
                    .content-layout {
                        grid-template-columns: 1fr;
                    }
                    .map-section {
                        display: none;
                    }
                    .trip-header {
                        padding: 15px 20px;
                    }
                }

                @media (max-width: 768px) {
                    .cards-section {
                        padding: 20px;
                        padding-bottom: 100px;
                    }
                    .map-section.active {
                        display: block;
                        position: fixed;
                        top: 75px;
                        left: 0;
                        width: 100%;
                        height: calc(100vh - 75px);
                        z-index: 90;
                    }
                }
            `}</style>

            <header className="trip-header">
                <button
                    className="back-btn"
                    onClick={() => navigate('/planning?view=destinations&type=' + (currentParams?.type || 'solo'))}
                >
                    <FaArrowLeft /> <span style={{ display: window.innerWidth > 600 ? 'inline' : 'none' }}>Back</span>
                </button>

                <div className="brand-logo">TENJIKU</div>

                <div className="budget-wrapper">
                    {isEditingBudget ? (
                        <div className="budget-tag" style={{ background: 'rgba(250, 204, 21, 0.15)', borderColor: '#FACC15' }}>
                            <FaSuitcaseRolling />
                            <span>₹</span>
                            <input
                                ref={budgetInputRef}
                                className="budget-input"
                                value={tempBudget}
                                onChange={(e) => setTempBudget(e.target.value)}
                                onBlur={handleBudgetSubmit}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    ) : (
                        <div className="budget-tag" onClick={handleBudgetClick} title="Click to change budget">
                            <FaSuitcaseRolling /> ₹{totalBudget}
                        </div>
                    )}

                    {showBudgetMenu && (
                        <div className="budget-menu" onClick={(e) => e.stopPropagation()}>
                            <div className="budget-option" onClick={() => handlePresetSelect('3000')}>
                                <span>Low</span> <span>₹3k</span>
                            </div>
                            <div className="budget-option" onClick={() => handlePresetSelect('7000')}>
                                <span>Mid</span> <span>₹7k</span>
                            </div>
                            <div className="budget-option" onClick={() => handlePresetSelect('10000')}>
                                <span>High</span> <span>₹10k</span>
                            </div>
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '4px 0' }}></div>
                            <div className="budget-option" onClick={handleCustomClick}>
                                <span>Custom...</span>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="content-layout">
                {/* Scrollable list */}
                <div className="cards-section">
                    <div style={{ marginBottom: "32px" }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '8px' }}>Routes from {startCity}</h1>
                        <p style={{ color: '#94A3B8', fontSize: '1rem' }}>
                            Best <span style={{ color: '#FACC15' }}>curated destinations</span> within your budget.
                        </p>
                    </div>

                    {destinations.length > 0 && destinations[0].isFallback && (
                        <div style={{
                            background: 'rgba(250, 204, 21, 0.05)',
                            padding: '16px',
                            border: '1px solid rgba(250, 204, 21, 0.2)',
                            borderRadius: '20px',
                            color: '#FACC15',
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '24px',
                            fontSize: '0.9rem'
                        }}>
                            <FaLightbulb style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>Nearby picks optimized for your start location and budget.</span>
                        </div>
                    )}

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div className="spinner"></div>
                            <h3 style={{ color: '#FACC15' }}>Curating Best Paths...</h3>
                        </div>
                    ) : (
                        <div className="destinations-list">
                            {destinations.map((dest) => (
                                <div
                                    key={dest.name}
                                    className={`card-item ${selectedDest === dest.name ? 'selected' : ''}`}
                                    onClick={() => handleSelectDest(dest.name)}
                                >
                                    <img src={dest.image} alt={dest.name} className="card-image" />
                                    <div className="dest-name">{dest.name}</div>
                                    <p className="dest-desc">{dest.description}</p>

                                    <div style={{ marginBottom: '16px' }}>
                                        <div className="info-pill rating-pill"><FaStar /> {dest.rating}</div>
                                        <div className="info-pill"><FaClock /> {dest.duration}</div>
                                        <div className="info-pill"><FaRoute /> {dest.distance} km</div>
                                    </div>

                                    <div style={{
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '12px',
                                        fontSize: '0.85rem',
                                        color: '#64748B',
                                        borderLeft: '3px solid #7C3AED'
                                    }}>
                                        {dest.details}
                                    </div>
                                </div>
                            ))}

                            {destinations.length === 0 && (
                                <div style={{ textAlign: 'center', color: '#64748B', padding: '40px' }}>
                                    <FaExclamationCircle size={40} style={{ marginBottom: '16px', opacity: 0.5 }} />
                                    <p>No destinations found for this criteria.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Desktop Map / Mobile Hidden Map */}
                <div className={`map-section ${isMobileMapOpen ? 'active' : ''}`}>
                    {selectedDest && (
                        <div style={{
                            position: 'absolute',
                            top: '24px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(10, 5, 20, 0.9)',
                            backdropFilter: 'blur(10px)',
                            padding: '12px 24px',
                            borderRadius: '30px',
                            border: '1px solid rgba(124, 58, 237, 0.4)',
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontWeight: 'bold',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}>
                            <span style={{ color: '#FACC15' }}>{startCity}</span>
                            <span style={{ color: '#7C3AED' }}>→</span>
                            <span>{selectedDest}</span>
                        </div>
                    )}
                    <MapView startCity={startCity} destination={selectedDest} height="100%" />

                    {/* Mobile close button */}
                    {isMobileMapOpen && (
                        <button
                            onClick={() => setIsMobileMapOpen(false)}
                            style={{
                                position: 'absolute',
                                bottom: '40px',
                                right: '24px',
                                background: '#7C3AED',
                                color: 'white',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                border: 'none',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
                                zIndex: 100,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile View Map Button */}
            {!isMobileMapOpen && window.innerWidth <= 1024 && (
                <button
                    onClick={() => setIsMobileMapOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#7C3AED',
                        color: 'white',
                        padding: '16px 32px',
                        borderRadius: '40px',
                        boxShadow: '0 15px 35px rgba(124, 58, 237, 0.4)',
                        border: 'none',
                        zIndex: 80,
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        letterSpacing: '0.5px'
                    }}
                >
                    <FaMapMarkerAlt /> SHOW MAP
                </button>
            )}
        </div>
    );
};

export default TripResultPage;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaChevronRight } from "react-icons/fa";

interface LoginPageProps {
    onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - accept anything
        onLogin();
    };

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#0A0510",
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 70%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Outfit', sans-serif",
            overflow: "hidden",
            position: "relative"
        }}>
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{
                    position: "absolute",
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "rgba(124, 58, 237, 0.1)",
                    filter: "blur(80px)",
                    top: "-100px",
                    right: "-100px",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    width: "100%",
                    maxWidth: "450px",
                    padding: "40px",
                    borderRadius: "32px",
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    zIndex: 10,
                    margin: "20px"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            marginBottom: "20px",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <img
                            src="/logo.png"
                            alt="Tenjiku Logo"
                            className="login-logo"
                            style={{
                                height: "60px",
                                width: "auto",
                                filter: "drop-shadow(0 0 20px rgba(124, 58, 237, 0.6))",
                            }}
                        />
                    </motion.div>
                    <h2 style={{
                        color: "#FACC15",
                        fontSize: "0.9rem",
                        fontWeight: 800,
                        letterSpacing: "4px",
                        textTransform: "uppercase",
                        margin: 0
                    }}>
                        Begin Your Journey
                    </h2>
                    <h1 style={{
                        color: "white",
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        letterSpacing: "-1px",
                        margin: "10px 0"
                    }}>
                        {isRegister ? "Join Tenjiku" : "Welcome Back"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <AnimatePresence mode="wait">
                        {isRegister && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: "hidden" }}
                            >
                                <div className="input-group">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="submit-btn" style={{
                        marginTop: "10px",
                        padding: "16px",
                        borderRadius: "16px",
                        border: "none",
                        background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "1rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        transition: "all 0.3s ease"
                    }}>
                        {isRegister ? "Create Account" : "Sign In"}
                        <FaChevronRight size={14} />
                    </button>
                </form>

                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <p style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.9rem" }}>
                        {isRegister ? "Already have an account?" : "Don't have an account?"}
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#FACC15",
                                fontWeight: 700,
                                marginLeft: "8px",
                                cursor: "pointer",
                                textDecoration: "underline"
                            }}
                        >
                            {isRegister ? "Sign In" : "Register Now"}
                        </button>
                    </p>
                </div>
            </motion.div>

            <style>{`
                .input-group {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                .input-icon {
                    position: absolute;
                    left: 20px;
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 1.1rem;
                }
                input {
                    width: 100%;
                    padding: 16px 20px 16px 54px;
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    background: rgba(255, 255, 255, 0.05);
                    color: white;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s ease;
                }
                input:focus {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: #7C3AED;
                    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
                }
                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
                }
                .submit-btn:active {
                    transform: translateY(0);
                }
                .login-logo {
                    animation: glow 3s ease-in-out infinite;
                }
                @keyframes glow {
                    0%, 100% {
                        filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.6));
                    }
                    50% {
                        filter: drop-shadow(0 0 30px rgba(124, 58, 237, 0.9));
                    }
                }
                @media (max-width: 768px) {
                    .login-logo {
                        height: 50px !important;
                    }
                }
            `}</style>
        </div>
    );
}

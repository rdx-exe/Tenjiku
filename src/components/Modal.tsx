import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
    maxWidth?: string;
}

export default function Modal({ title, onClose, children, icon, maxWidth = "480px" }: ModalProps) {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(15px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "15px"
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                style={{
                    background: "#0D0816",
                    width: "100%",
                    maxWidth: maxWidth,
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "32px",
                    overflowX: "hidden",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                    boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <div style={{
                    padding: "24px 32px",
                    borderBottom: "1px solid rgba(124, 58, 237, 0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(124, 58, 237, 0.03)"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "white", fontWeight: "800", fontSize: "1.2rem" }}>
                        {icon && <span style={{ color: "#FACC15", display: "flex" }}>{icon}</span>}
                        <span style={{
                            color: icon ? "white" : "#FACC15"
                        }}>
                            {title}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            color: "white",
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            padding: 0
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)";
                            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                            e.currentTarget.style.color = "#FF4444";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                            e.currentTarget.style.color = "white";
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div style={{ padding: "32px" }}>
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

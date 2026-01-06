import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaPlane } from "react-icons/fa";

// Import Google Fonts
import "./fonts.css";

interface IntroSplashProps {
    onFinish: () => void;
}

import { IndiaMap } from "./IndiaMap";

const TRAVEL_PATH = "M350,800 C450,600 250,400 350,150"; // Path across the 1000x1000 map

const ManualFlightOverlay = ({ travelPath }: { travelPath: string }) => {
    const pathRef = useRef<SVGPathElement>(null);
    const planeRef = useRef<SVGGElement>(null);
    const trailRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const path = pathRef.current;
        const plane = planeRef.current;
        const trail = trailRef.current;
        if (!path || !plane || !trail) return;

        const length = path.getTotalLength();
        let start: number | null = null;
        const duration = 3000; // 3 seconds for the flight

        const animate = (time: number) => {
            if (!start) start = time;
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1); // Run once, cap at 1

            // Cinematic Easing: Takeoff -> Constant -> Slowdown
            const easedProgress = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            const point = path.getPointAtLength(easedProgress * length);

            // Calculate rotation using tangent
            const delta = 1;
            const pointBefore = path.getPointAtLength(Math.max(0, easedProgress * length - delta));
            const pointAfter = path.getPointAtLength(Math.min(length, easedProgress * length + delta));
            const angle = Math.atan2(pointAfter.y - pointBefore.y, pointAfter.x - pointBefore.x) * (180 / Math.PI);

            // Subtly scale plane at start and end
            const scale = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;

            // Update plane position, rotation, and scale manually
            plane.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle}) scale(${scale})`);
            plane.style.opacity = `${Math.min(progress * 5, 1)}`;

            // Update trail drawing behind the plane
            trail.style.strokeDasharray = `${length}`;
            trail.style.strokeDashoffset = `${length - easedProgress * length}`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const requestId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestId);
    }, [travelPath]);

    return (
        <svg viewBox="0 0 1000 1000" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 10 }}>
            <defs>
                <filter id="plane-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Background faint path (the ghost route) */}
            <path
                ref={pathRef}
                d={travelPath}
                fill="none"
                stroke="rgba(250, 204, 21, 0.1)"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Glowing active trail line drawn behind the plane */}
            <path
                ref={trailRef}
                d={travelPath}
                fill="none"
                stroke="#FACC15"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 12px #FACC15)" }}
            />

            {/* Engine Heat / Particle Glow */}
            <g ref={planeRef}>
                <circle r="20" fill="#FACC15" style={{ filter: "blur(20px)", opacity: 0.4 }} />
                <circle r="8" fill="#fff" style={{ filter: "blur(6px)", opacity: 0.6 }} />

                <foreignObject width="100" height="100" x="-50" y="-50">
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FaPlane style={{
                            color: "#fff",
                            fontSize: "32px",
                            filter: "drop-shadow(0 0 15px rgba(255,255,255,0.8))",
                        }} />
                    </div>
                </foreignObject>
            </g>
        </svg>
    );
};

export default function IntroSplash({ onFinish }: IntroSplashProps) {
    const [stage, setStage] = useState(1); // 1: Map/Plane, 2: Logo, 3: Tagline, 4: Fadeout

    useEffect(() => {
        if (stage === 1) {
            const timer = setTimeout(() => setStage(2), 3500); // 3s flight + 0.5s pause
            return () => clearTimeout(timer);
        }
        if (stage === 2) {
            const timer = setTimeout(() => setStage(3), 1500);
            return () => clearTimeout(timer);
        }
        if (stage === 3) {
            const timer = setTimeout(() => setStage(4), 3000);
            return () => clearTimeout(timer);
        }
        if (stage === 4) {
            const timer = setTimeout(() => onFinish(), 1000);
            return () => clearTimeout(timer);
        }
    }, [stage, onFinish]);

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "#0A0510",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            fontFamily: "'Outfit', sans-serif",
            position: "relative"
        }}>
            <AnimatePresence mode="wait">
                {stage === 1 && (
                    <motion.div
                        key="stage1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: "relative",
                            width: "min(450px, 90vw)",
                            height: "min(450px, 60vh)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            {/* Manual JS-Driven Flight Overlay */}
                            <ManualFlightOverlay travelPath={TRAVEL_PATH} />
                            <IndiaMap size="100%" color="#7C3AED" />
                        </div>
                    </motion.div>
                )}

                {stage === 2 && (
                    <motion.div
                        key="stage2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ textAlign: "center" }}
                    >
                        <h1 style={{
                            fontFamily: "'Abril Fatface', serif",
                            fontSize: "clamp(3rem, 15vw, 8rem)",
                            fontWeight: 900,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "clamp(5px, 2vw, 15px)",
                            margin: 0,
                            textShadow: "0 0 30px rgba(124, 58, 237, 0.6)",
                            position: "relative"
                        }}>
                            TENJIKU
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                style={{
                                    height: "4px",
                                    background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
                                    position: "absolute",
                                    bottom: "-10px",
                                    left: 0
                                }}
                            />
                        </h1>
                    </motion.div>
                )}

                {stage === 3 && (
                    <motion.div
                        key="stage3"
                        style={{ textAlign: "center" }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                fontFamily: "'Abril Fatface', serif",
                                fontSize: "clamp(4rem, 15vw, 8rem)",
                                fontWeight: 900,
                                color: "#fff",
                                textTransform: "uppercase",
                                letterSpacing: "15px",
                                margin: 0,
                                textShadow: "0 0 30px rgba(124, 58, 237, 0.6)",
                                position: "relative"
                            }}
                        >
                            TENJIKU
                            <div style={{
                                height: "4px",
                                background: "linear-gradient(90deg, transparent, #7C3AED, transparent)",
                                position: "absolute",
                                bottom: "-10px",
                                left: 0,
                                width: "100%"
                            }} />
                        </motion.h1>

                        <div style={{ marginTop: "40px", overflow: "hidden" }}>
                            <motion.p
                                initial={{ y: "100%", opacity: 1 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "clamp(1rem, 4vw, 1.5rem)",
                                    color: "#C084FC",
                                    fontWeight: 600,
                                    margin: "10px 0",
                                    letterSpacing: "2px"
                                }}
                            >
                                Travel With Confidence
                            </motion.p>
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <motion.p
                                initial={{ y: "100%", opacity: 1 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "clamp(1rem, 4vw, 1.5rem)",
                                    color: "#C084FC",
                                    fontWeight: 600,
                                    margin: "10px 0",
                                    letterSpacing: "2px"
                                }}
                            >
                                Not Confusion
                            </motion.p>
                        </div>
                    </motion.div>
                )}

                {stage === 4 && (
                    <motion.div
                        key="stage4"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textAlign: "center" }}
                    >
                        <h1 style={{
                            fontFamily: "'Abril Fatface', serif",
                            fontSize: "clamp(4rem, 15vw, 8rem)",
                            fontWeight: 900,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "15px",
                            margin: 0,
                        }}>
                            TENJIKU
                        </h1>
                        <div style={{ marginTop: "40px" }}>
                            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.5rem", color: "#C084FC", fontWeight: 600, margin: "10px 0" }}>
                                Travel with confidence,
                            </p>
                            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.5rem", color: "#C084FC", fontWeight: 600, margin: "10px 0" }}>
                                not confusion.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

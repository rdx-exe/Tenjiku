import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function LocationShare() {
  function shareLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        alert(`Location shared successfully!\nLatitude: ${latitude}\nLongitude: ${longitude}`);
      },
      (err) => {
        console.error("Location retrieval failed:", err);
        alert("Unable to retrieve location. Please check your permissions.");
      }
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, background: "#7C3AED" }}
      whileTap={{ scale: 0.95 }}
      onClick={shareLocation}
      style={{
        padding: "16px 32px",
        background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
        color: "white",
        border: "none",
        borderRadius: "16px",
        fontSize: "1.1rem",
        fontWeight: 800,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        boxShadow: "0 10px 20px rgba(124, 58, 237, 0.4)",
        letterSpacing: "0.5px",
        margin: "10px auto"
      }}
    >
      <FaMapMarkerAlt />
      Share My Location
    </motion.button>
  );
}

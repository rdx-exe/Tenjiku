import { useState } from "react";

export default function QuickSOS() {
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickLocationShare = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // Try to share using Web Share API if available
        if (navigator.share) {
          navigator.share({
            title: "My Location",
            text: `My location: Lat ${latitude}, Lng ${longitude}`,
          }).catch(() => {
            alert(`Location shared:\nLat: ${latitude}\nLng: ${longitude}`);
          });
        } else {
          // Fallback alert
          alert(`Location shared:\nLat: ${latitude}\nLng: ${longitude}`);
        }
      },
      (error) => {
        alert("Unable to access location. Please check permissions.");
        console.error("Geolocation error:", error);
      }
    );
  };

  return (
    <button
      onClick={handleQuickLocationShare}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        backgroundColor: isHovered ? "#cc0000" : "#ff0000",
        color: "white",
        border: "none",
        fontSize: "18px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(255, 0, 0, 0.4)",
        zIndex: 1000,
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: isHovered ? "scale(1.1)" : "scale(1)",
      }}
      title="Quick SOS - Share Location"
    >
      SOS
    </button>
  );
}

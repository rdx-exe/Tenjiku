type MapViewProps = {
  startCity?: string;
  destination?: string;
  height?: string;
};

export default function MapView({
  startCity = "Delhi",
  destination = "Manali",
  height = "100%",
}: MapViewProps) {
  const mapQuery = `${startCity} to ${destination}`;

  return (
    <div
      style={{
        width: "100%",
        height: height,
        overflow: "hidden",
      }}
    >
      <iframe
        title="Trip Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          mapQuery
        )}&output=embed`}
      />
    </div>
  );
}

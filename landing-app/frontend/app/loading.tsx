export default function Loading() {
  return (
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      height: "100vh", background: "#020617", gap: 24
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: "linear-gradient(135deg, #a855f7, #22d3ee)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, fontWeight: 900, color: "white",
        animation: "pulse 1.5s ease-in-out infinite"
      }}>D</div>
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "linear-gradient(135deg, #a855f7, #22d3ee)",
            animation: "pulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`
          }} />
        ))}
      </div>
    </div>
  );
}

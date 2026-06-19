export default function Loading() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg, #020617)" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
          animation: "pulse 1.8s ease-in-out infinite",
        }}>
          <div style={{ width: 20, height: 20, border: "3px solid rgba(168,85,247,0.3)", borderTopColor: "#a855f7", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted, #52525b)", fontWeight: 600, letterSpacing: "0.5px" }}>Cargando...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } } @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }`}</style>
      </div>
    </div>
  )
}

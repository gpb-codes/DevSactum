export default function NotFound() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg, #020617)" }}>
      <div style={{ textAlign: "center", maxWidth: 420, padding: 32 }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: "var(--text-muted, #52525b)", lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: "var(--text-h, #f4f4f5)", margin: "0 0 8px" }}>Página no encontrada</h1>
        <p style={{ fontSize: 13, color: "var(--text, #a1a1aa)", margin: "0 0 24px", lineHeight: 1.6 }}>
          La página que buscas no existe o fue movida.
        </p>
        <a
          href="/"
          style={{ background: "var(--primary, #a855f7)", color: "#fff", border: "none", borderRadius: 9, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "inline-block" }}
        >
          Volver al inicio
        </a>
      </div>
    </div>
  )
}

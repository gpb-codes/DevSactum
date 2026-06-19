"use client"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "#020617", color: "#a1a1aa", fontFamily: "Inter, system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", maxWidth: 420, padding: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24 }}>
            !
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: "#f4f4f5", margin: "0 0 8px" }}>Algo salió mal</h1>
          <p style={{ fontSize: 13, margin: "0 0 20px", lineHeight: 1.6 }}>{error.message || "Ocurrió un error inesperado."}</p>
          {error.digest && <p style={{ fontSize: 10, fontFamily: "monospace", color: "#52525b", margin: "0 0 16px" }}>Error ID: {error.digest}</p>}
          <button
            onClick={reset}
            style={{ background: "#fb923c", color: "#1a0033", border: "none", borderRadius: 9, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  )
}

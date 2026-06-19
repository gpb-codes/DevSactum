export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "60px 0 40px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: "var(--gradient)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 900, color: "white"
              }}>D</div>
              <span style={{ fontSize: 20, fontWeight: 800, background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DevSactum</span>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-soft)", lineHeight: 1.7, maxWidth: 280 }}>
              La red social para desarrolladores. Construida por Dräkkar Labs para el ecosistema tech de Latinoamérica.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-h)", marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Producto</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Feed de Código", "Bolsa de Empleo", "Comunidades", "Portafolio", "Chat en Tiempo Real", "IA para Matching"].map((item, i) => (
                <a key={i} href="#product" style={{ fontSize: 14, color: "var(--text-soft)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--purple-light)"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-soft)"; }}
                >{item}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-h)", marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Empresa</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Dräkkar Labs", "La Pintana, Santiago", "Chile", "drakkarlabs@gmail.com"].map((item, i) => (
                <span key={i} style={{ fontSize: 14, color: "var(--text-soft)" }}>{item}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-h)", marginBottom: 16, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>Síguenos</h4>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { url: "https://www.instagram.com/drakkar_labs/", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></> },
                { url: "https://github.com/gpb-industries/DRAKKAR", icon: <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></> },
                { url: "https://drakkar-labs.pages.dev/", icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> }
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "var(--bg-surface)", border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text)", transition: "all 0.2s"
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--purple)";
                    (e.currentTarget as HTMLElement).style.color = "var(--purple-light)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 13, color: "var(--text-soft)" }}>
            &copy; 2026 Dräkkar Labs — DevSactum. Todos los derechos reservados.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ fontSize: 13, color: "var(--text-soft)" }}>La Pintana, Santiago, Chile</span>
            <span style={{ fontSize: 13, color: "var(--text-soft)" }}>drakkar-labs.pages.dev</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

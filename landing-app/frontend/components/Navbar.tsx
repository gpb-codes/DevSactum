"use client";

export default function Navbar() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(2,6,23,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--glass-border)",
      padding: "0 32px", height: 72,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      animation: "fadeInDown 0.6s ease"
    }}>
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, fontWeight: 900, color: "white"
        }}>D</div>
        <span style={{ fontSize: 20, fontWeight: 800, background: "var(--gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          DevSactum
        </span>
      </a>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {[
          { href: "#about", label: "Nosotros" },
          { href: "#product", label: "Producto" },
          { href: "#tech", label: "Stack" },
          { href: "#benefits", label: "Beneficios" },
          { href: "#data", label: "Datos" },
          { href: "#social", label: "Redes" },
          { href: "#contact", label: "Contacto" },
        ].map((link, i) => (
          <a key={i} href={link.href} style={{
            color: "var(--text)", fontSize: 14, fontWeight: 500,
            transition: "color 0.2s", letterSpacing: "0.01em"
          }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--purple-light)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text)"; }}
          >
            {link.label}
          </a>
        ))}
        <a href="https://drakkar-labs.pages.dev/#devsactum" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
          Unirme a la Beta
        </a>
      </div>
    </nav>
  );
}

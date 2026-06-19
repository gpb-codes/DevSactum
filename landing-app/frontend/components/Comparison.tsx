"use client";
import { useEffect, useRef } from "react";

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    { name: "Feed de código", dev: true, li: false, gh: true, di: false },
    { name: "Bolsa de empleo", dev: true, li: true, gh: false, di: false },
    { name: "Comunidades", dev: true, li: false, gh: false, di: true },
    { name: "Portafolio", dev: true, li: true, gh: true, di: false },
    { name: "Reputación", dev: true, li: false, gh: false, di: false },
    { name: "Chat en tiempo real", dev: true, li: false, gh: false, di: true },
    { name: "IA para matching", dev: true, li: false, gh: false, di: false },
    { name: "Freelancing", dev: true, li: false, gh: false, di: false }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            el.classList.add('visible');
          });
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 80px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>DIFERENCIACIÓN</div>
          <h2 className="section-title">DevSactum vs La Competencia</h2>
          <p className="section-desc">LinkedIn te ayuda a buscar empleo, GitHub a mostrar código, Discord a comunicarte — pero ninguno une todo.</p>
        </div>

        <div className="reveal" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: 20, overflow: "hidden",
            boxShadow: "0 4px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", borderBottom: "1px solid var(--border)" }}>
              {[
                { label: "Característica", color: "var(--text-h)", weight: 600 },
                { label: "DevSactum", color: "var(--cyan)", weight: 700, highlight: true },
                { label: "LinkedIn", color: "var(--text-h)", weight: 500 },
                { label: "GitHub", color: "var(--text-h)", weight: 500 },
                { label: "Discord", color: "var(--text-h)", weight: 500 }
              ].map((col, i) => (
                <div key={i} style={{
                  padding: "18px 20px",
                  background: i === 1 ? "rgba(34,211,238,0.08)" : "var(--bg-surface-2)",
                  color: col.color, fontWeight: col.weight, fontSize: 14,
                  borderRight: i < 4 ? "1px solid var(--border)" : "none",
                  position: "relative"
                }}>
                  {col.label}
                  {i === 1 && (
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3,
                      background: "var(--gradient)"
                    }} />
                  )}
                </div>
              ))}
            </div>

            {features.map((f, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
                borderBottom: i < features.length - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.2s"
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,85,247,0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{ padding: "16px 20px", fontSize: 14, color: "var(--text)", borderRight: "1px solid var(--border)" }}>{f.name}</div>
                <div style={{
                  padding: "16px 20px", fontSize: 14,
                  color: f.dev ? "var(--cyan)" : "var(--text-soft)",
                  fontWeight: f.dev ? 700 : 400,
                  background: "rgba(34,211,238,0.04)",
                  borderRight: "1px solid var(--border)",
                  textAlign: "center"
                }}>{f.dev ? "✓" : "—"}</div>
                <div style={{
                  padding: "16px 20px", fontSize: 14,
                  color: f.li ? "var(--cyan)" : "var(--text-soft)",
                  fontWeight: f.li ? 700 : 400,
                  borderRight: "1px solid var(--border)",
                  textAlign: "center"
                }}>{f.li ? "✓" : "—"}</div>
                <div style={{
                  padding: "16px 20px", fontSize: 14,
                  color: f.gh ? "var(--cyan)" : "var(--text-soft)",
                  fontWeight: f.gh ? 700 : 400,
                  borderRight: "1px solid var(--border)",
                  textAlign: "center"
                }}>{f.gh ? "✓" : "—"}</div>
                <div style={{
                  padding: "16px 20px", fontSize: 14,
                  color: f.di ? "var(--cyan)" : "var(--text-soft)",
                  fontWeight: f.di ? 700 : 400,
                  textAlign: "center"
                }}>{f.di ? "✓" : "—"}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <p style={{ fontSize: 15, color: "var(--text)" }}>
              <strong style={{ color: "var(--cyan)" }}>DevSactum</strong> es la única plataforma que integra feed, empleo, comunidades, portafolio, chat, reputación e IA en un solo lugar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

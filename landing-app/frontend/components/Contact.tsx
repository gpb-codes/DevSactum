"use client";
import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", background: "var(--bg)",
    border: "1px solid var(--border)", borderRadius: 12, color: "var(--text-h)",
    fontSize: 14, fontFamily: "inherit", transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none"
  };

  return (
    <section id="contact" ref={sectionRef} style={{ padding: "120px 0", background: "var(--bg-surface)" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "var(--gradient)", opacity: 0.3
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 80px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>CONTACTO</div>
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-desc">¿Preguntas, sugerencias o quieres colaborar? Escríbenos. Si eres developer, startup o empresa, nos encantaría conocerte.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 40, alignItems: "start" }}>
          <div className="reveal-left glass-card" style={{ padding: 40 }}>
            <h3 style={{ fontSize: 20, marginBottom: 24 }}>Envíanos un Mensaje</h3>
            <form action="http://localhost:3001/api/contact" method="POST">
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-h)", marginBottom: 8 }}>Nombre</label>
                <input type="text" name="name" placeholder="Tu nombre completo" style={inputStyle}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--purple)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-h)", marginBottom: 8 }}>Correo Electrónico</label>
                <input type="email" name="email" placeholder="tu@email.com" style={inputStyle}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--purple)"; (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; (e.target as HTMLInputElement).style.boxShadow = "none"; }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-h)", marginBottom: 8 }}>Asunto</label>
                <select name="subject" style={{ ...inputStyle, appearance: "none" as const, cursor: "pointer" }}>
                  <option>Consulta sobre DevSactum</option>
                  <option>Unirse a la Beta</option>
                  <option>Alianza / Colaboración</option>
                  <option>Otro</option>
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-h)", marginBottom: 8 }}>Mensaje</label>
                <textarea name="message" placeholder="Escribe tu mensaje aquí..." rows={5} style={{ ...inputStyle, resize: "vertical" as const }}
                  onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--purple)"; (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(168,85,247,0.15)"; }}
                  onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "var(--border)"; (e.target as HTMLTextAreaElement).style.boxShadow = "none"; }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px 32px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Enviar Mensaje
              </button>
            </form>
          </div>

          <div className="reveal-right" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { title: "Ubicación", value: "La Pintana, Santiago, Chile", icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>, color: "var(--purple)" },
              { title: "Correo", value: "drakkarlabs@gmail.com", icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>, color: "var(--cyan)" },
              { title: "Sitio Web", value: "drakkar-labs.pages.dev", icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>, color: "var(--orange)" },
              { title: "Instagram", value: "@drakkar_labs", icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>, color: "var(--green)" }
            ].map((c, i) => (
              <div key={i} className="glass-card" style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 22 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `linear-gradient(135deg, ${c.color}20, ${c.color}08)`,
                  border: `1px solid ${c.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: c.color, flexShrink: 0
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                </div>
                <div>
                  <h4 style={{ fontSize: 15, marginBottom: 4 }}>{c.title}</h4>
                  <p style={{ fontSize: 14, color: "var(--text-soft)" }}>{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

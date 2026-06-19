"use client";
import { useEffect, useRef } from "react";

export default function Benefits() {
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

  return (
    <section id="benefits" ref={sectionRef} style={{ padding: "120px 0", background: "var(--bg-surface)", position: "relative" }}>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: "var(--gradient)", opacity: 0.3
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 80px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>BENEFICIOS</div>
          <h2 className="section-title">¿Por Qué DevSactum?</h2>
          <p className="section-desc">Beneficios directos para desarrolladores, empresas y la comunidad tech. No existimos para competir con una herramienta; existimos para reemplazar las 14 que usas hoy.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
          {[
            { title: "Una Solo Plataforma", desc: "Olvidate de cambiar entre 14 herramientas. Feed, empleo, portafolio, chat y comunidades en un solo lugar.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z", color: "var(--purple)" },
            { title: "Empleo Directo", desc: "Bolsa de trabajo integrada que conecta startups y empresas con talento técnico de LATAM y el mundo.", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", color: "var(--cyan)" },
            { title: "IA para Matching", desc: "Herramientas de inteligencia artificial que te ayudan a encontrar las mejores oportunidades laborales.", icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4v6l4 2", color: "var(--orange)" },
            { title: "Reputación y Validación", desc: "Sistema de puntos, badges y validaciones técnicas que demuestran tus habilidades reales.", icon: "M12 20V10M18 20V4M6 20v-4", color: "var(--green)" },
            { title: "Comunidades Activas", desc: "Unite a grupos temáticos, debate mejores prácticas y aprende de la comunidad developer.", icon: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z", color: "var(--purple-light)" },
            { title: "Portafolio Profesional", desc: "Destaca tus proyectos, contribuciones GitHub y construye tu marca personal como developer.", icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", color: "var(--cyan)" }
          ].map((b, i) => (
            <div key={i} className={`reveal stagger-${i + 1} glass-card`} style={{ padding: 32 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${b.color}20, ${b.color}08)`,
                border: `1px solid ${b.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20, color: b.color
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon}/></svg>
              </div>
              <h4 style={{ fontSize: 18, marginBottom: 10 }}>{b.title}</h4>
              <p style={{ fontSize: 14, color: "var(--text-soft)", lineHeight: 1.7 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

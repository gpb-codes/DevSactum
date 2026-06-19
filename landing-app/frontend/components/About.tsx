"use client";
import { useEffect, useRef } from "react";

export default function About() {
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
    <section id="about" ref={sectionRef} style={{ padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 80px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>NOSOTROS</div>
          <h2 className="section-title">Quiénes Somos</h2>
          <p className="section-desc">Dräkkar Labs es una startup tecnológica con sede en La Pintana, Santiago de Chile. Nuestra misión es construir infraestructura inteligente que permita escalar tecnología con velocidad, fiabilidad y precisión.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 80 }}>
          {[
            { title: "Misión", desc: "Ingeniar infraestructura inteligente y plataformas que permitan a las organizaciones construir, escalar y desplegar tecnología con velocidad, fiabilidad y precisión sin precedentes.", color: "var(--purple)", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
            { title: "Visión", desc: "Un mundo donde cada organización tenga acceso a sistemas de IA, arquitectura cloud e inteligencia de ingeniería de nivel empresarial.", color: "var(--cyan)", icon: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" },
            { title: "Necesidad", desc: "Los developers usan 14 herramientas diarias. El 40% de su productividad se pierde saltando entre ellas. DevSactum une todo en una sola plataforma.", color: "var(--orange)", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }
          ].map((card, i) => (
            <div key={i} className={`reveal-scale stagger-${i + 1} glass-card`} style={{ padding: 36 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `linear-gradient(135deg, ${card.color}20, ${card.color}08)`,
                border: `1px solid ${card.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24, color: card.color
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={card.icon}/></svg>
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 14 }}>{card.title}</h3>
              <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 48px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>VALORES</div>
          <h2 className="section-title">Nuestra Filosofía</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 80 }}>
          {[
            { title: "Excelencia en Ingeniería", desc: "Cada sistema está elaborado con precisión, rendimiento y escalabilidad.", icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
            { title: "Pensamiento Visionario", desc: "Anticipamos el futuro de la tecnología y construimos infraestructura que potencia las soluciones del mañana.", icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4v6l4 2" },
            { title: "Escala Global", desc: "Diseñamos sistemas para resistencia y escalabilidad global desde el primer día.", icon: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" },
            { title: "Confianza y Seguridad", desc: "Seguridad de nivel empresarial integrada en cada capa de nuestra arquitectura.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
            { title: "Innovación Incansable", desc: "Impulsamos los límites de lo posible a través de investigación y desarrollo continuos.", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
            { title: "Ecosistema Abierto", desc: "Construimos plataformas interoperables que empoderan a desarrolladores y empresas.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" }
          ].map((v, i) => (
            <div key={i} className={`reveal stagger-${(i % 6) + 1} glass-card`} style={{ padding: 28 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}><path d={v.icon}/></svg>
              <h4 style={{ fontSize: 16, marginBottom: 8 }}>{v.title}</h4>
              <p style={{ fontSize: 14, color: "var(--text-soft)", lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 48px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>EQUIPO</div>
          <h2 className="section-title">Los Fundadores</h2>
          <p className="section-desc">Dos estudiantes de Informática con experiencia en ingeniería de software, cloud y desarrollo de plataformas.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, maxWidth: 800, margin: "0 auto" }}>
          {[
            { name: "Gabriel Pedreros", role: "CEO · Fundador", initials: "GP", desc: "Estudiante de Informática con pasión por la ingeniería de software y la transformación digital en Latinoamérica." },
            { name: "Pablo Cocío", role: "CTO · Co-fundador", initials: "PC", desc: "Estudiante de Informática especializado en infraestructura cloud, inteligencia artificial y plataformas escalables." }
          ].map((m, i) => (
            <div key={i} className={`reveal-scale stagger-${i + 1} glass-card`} style={{ textAlign: "center", padding: 40 }}>
              <div style={{
                width: 96, height: 96, borderRadius: "50%",
                background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px", fontSize: 32, fontWeight: 800, color: "white",
                boxShadow: "0 8px 32px rgba(168,85,247,0.3)",
                animation: "glow 4s ease-in-out infinite"
              }}>{m.initials}</div>
              <h3 style={{ fontSize: 20, marginBottom: 6 }}>{m.name}</h3>
              <div style={{ fontSize: 14, color: "var(--purple-light)", fontWeight: 600, marginBottom: 12 }}>{m.role}</div>
              <p style={{ fontSize: 14, color: "var(--text-soft)", lineHeight: 1.6 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

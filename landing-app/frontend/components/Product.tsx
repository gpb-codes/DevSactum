"use client";
import { useEffect, useRef, useState } from "react";

const features = [
  { name: "Feed de Código", desc: "Publicaciones con syntax highlighting para compartir proyectos, tutoriales y logros.", color: "var(--purple)" },
  { name: "Comunidades", desc: "Grupos temáticos para debatir, aprender y conectar con otros desarrolladores.", color: "var(--cyan)" },
  { name: "Bolsa de Empleo", desc: "Conecta startups y empresas con talento técnico de LATAM y el mundo.", color: "var(--orange)" },
  { name: "Portafolio", desc: "Destaca tus proyectos, contribuciones GitHub y construye tu marca personal.", color: "var(--green)" },
  { name: "Chat en Tiempo Real", desc: "Mensajería directa y chat en tiempo real entre usuarios.", color: "var(--purple-light)" },
  { name: "IA para Matching", desc: "Herramientas de IA para matching laboral, análisis de CV y detección de brechas.", color: "var(--cyan)" },
  { name: "Reputación", desc: "Sistema de puntos, badges y validaciones que demuestran tus habilidades reales.", color: "var(--orange)" },
  { name: "Freelancing", desc: "Proyectos independientes y oportunidades de trabajo freelance integradas.", color: "var(--green)" }
];

export default function Product() {
  const [active, setActive] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="product" ref={sectionRef} style={{ padding: "120px 0", background: "var(--bg-surface)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "var(--gradient)", opacity: 0.3
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 80px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>PRODUCTO</div>
          <h2 className="section-title">¿Qué es DevSactum?</h2>
          <p className="section-desc">La red social para desarrolladores. Una sola plataforma que reúne todo lo que necesitas para construir tu carrera en tecnología.</p>
        </div>

        <div className="reveal" style={{
          background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 24,
          overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr",
          minHeight: 500
        }}>
          <div style={{ padding: 48, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontSize: 28, marginBottom: 16, lineHeight: 1.2 }}>Tu Ecosistema Developer en un Solo Lugar</h3>
            <p style={{ fontSize: 15, marginBottom: 28, lineHeight: 1.7 }}>DevSactum reemplaza las 14 herramientas que usas a diario. Feed, empleo, portafolio, chat y comunidades — todo integrado con inteligencia artificial.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {features.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
                    borderRadius: 12, cursor: "pointer",
                    background: active === i ? `${f.color}12` : "transparent",
                    border: `1px solid ${active === i ? `${f.color}40` : "transparent"}`,
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: active === i ? f.color : "var(--text-soft)",
                    transition: "all 0.3s ease",
                    boxShadow: active === i ? `0 0 8px ${f.color}60` : "none"
                  }} />
                  <span style={{
                    fontSize: 14, fontWeight: active === i ? 600 : 400,
                    color: active === i ? "var(--text-h)" : "var(--text-soft)",
                    transition: "all 0.3s ease"
                  }}>{f.name}</span>
                </div>
              ))}
            </div>

            <a href="https://drakkar-labs.pages.dev/#devsactum" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ alignSelf: "flex-start" }}>
              Unirme a la Beta
            </a>
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${features[active].color}10, ${features[active].color}05)`,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 48,
            position: "relative", transition: "background 0.5s ease"
          }}>
            <div style={{
              background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16,
              padding: 24, width: "100%", maxWidth: 420,
              boxShadow: `0 8px 40px ${features[active].color}15`,
              transition: "box-shadow 0.5s ease"
            }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f87171" }}></div>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#facc15" }}></div>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80" }}></div>
              </div>

              <div style={{
                background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12,
                padding: 20, marginBottom: 12,
                animation: "scaleIn 0.4s ease"
              }} key={active}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, color: "white"
                  }}>DS</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-h)" }}>DevSactum</div>
                    <div style={{ fontSize: 11, color: "var(--text-soft)" }}>Ahora</div>
                  </div>
                </div>

                <div style={{ fontSize: 14, color: "var(--text-h)", marginBottom: 12, fontWeight: 500 }}>
                  {features[active].name}
                </div>
                <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>
                  {features[active].desc}
                </div>

                <div style={{
                  marginTop: 14, padding: 12, borderRadius: 8,
                  background: "var(--bg-surface)", border: "1px solid var(--border)",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                  color: features[active].color
                }}>
                  {active === 0 && "<Feed>\n  <Post language=\"typescript\">\n    const app = createApp();\n  </Post>\n</Feed>"}
                  {active === 1 && "<Community name=\"React LATAM\">\n  <Members>12,400+</Members>\n  <Topics>React, Next.js, SSR</Topics>\n</Community>"}
                  {active === 2 && "<JobListing>\n  <Company>Startup Chile</Company>\n  <Role>Full Stack Dev</Role>\n  <Match>94% con tu perfil</Match>\n</JobListing>"}
                  {active === 3 && "<Portfolio user=\"maria_dev\">\n  <Projects>12</Projects>\n  <GitHubContributions>847</GitHubContributions>\n</Portfolio>"}
                  {active === 4 && "<Chat>\n  <Message from=\"alex\">\n    Hey, vi tu proyecto!\n  </Message>\n  <Status>online</Status>\n</Chat>"}
                  {active === 5 && "<AI_Matching>\n  <Analyze cv=\"profile\"/>\n  <Match>94% compatibilidad</Match>\n  <Gaps>[\"Docker\", \"AWS\"]</Gaps>\n</AI_Matching>"}
                  {active === 6 && "<Reputation>\n  <Score>4,850 pts</Score>\n  <Badges>[\"React Pro\", \"Mentor\"]\n  <Level>Senior</Level>\n</Reputation>"}
                  {active === 7 && "<Freelance>\n  <Project>API REST</Project>\n  <Budget>$2,500 USD</Budget>\n  <Duration>3 semanas</Duration>\n</Freelance>"}
                </div>

                <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 12, color: "var(--text-soft)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    234
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    45
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

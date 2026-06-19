"use client";
import { useEffect, useRef } from "react";

export default function TechStack() {
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
    <section id="tech" ref={sectionRef} style={{ padding: "120px 0", background: "var(--bg)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 80px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>STACK TECNOLÓGICO</div>
          <h2 className="section-title">Arquitectura del Sistema</h2>
          <p className="section-desc">Una plataforma construida con tecnologías de nivel empresarial. Robusta, escalable y moderna.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24, marginBottom: 64 }}>
          {[
            { title: "Frontend", color: "var(--cyan)", icon: "polygon points 12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2", items: [
              { name: "Next.js 15", desc: "React 19, App Router, Server Components, RSC" },
              { name: "TypeScript 5.8", desc: "Tipado estático estricto, seguridad en compile-time" },
              { name: "Tailwind CSS 4.1", desc: "CSS-first config, diseño responsivo utility-first" },
              { name: "PWA Ready", desc: "Service Worker + Manifest para apps instalables" }
            ]},
            { title: "Backend", color: "var(--purple)", icon: "rect 2 2 20 8 2 14 20 8 2 14", items: [
              { name: "NestJS", desc: "API REST, JWT Auth, WebSockets, modular architecture" },
              { name: "Go + Gin", desc: "Microservicios de alto rendimiento, jobs pesados" },
              { name: "PostgreSQL", desc: "Base de datos relacional principal, ACID compliant" },
              { name: "WebSocket", desc: "Chat en tiempo real, notificaciones push" }
            ]},
            { title: "Infraestructura", color: "var(--orange)", icon: "wrench", items: [
              { name: "Docker", desc: "Containerización, orchestration, multi-stage builds" },
              { name: "Cloudflare Pages", desc: "Hosting edge, CDN global, SSL automático" },
              { name: "CI/CD", desc: "GitHub Actions, deploy automatizado, testing" },
              { name: "Vitest", desc: "Testing unitario, integración, E2E" }
            ]}
          ].map((tech, i) => (
            <div key={i} className={`reveal stagger-${i + 1} glass-card`} style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}08)`,
                  border: `1px solid ${tech.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: tech.color
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>}
                    {i === 1 && <><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>}
                    {i === 2 && <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>}
                  </svg>
                </div>
                <h3 style={{ fontSize: 20 }}>{tech.title}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {tech.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: tech.color, marginTop: 7, flexShrink: 0,
                      boxShadow: `0 0 6px ${tech.color}60`
                    }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-h)", fontFamily: "'JetBrains Mono', monospace" }}>{item.name}</div>
                      <div style={{ fontSize: 13, color: "var(--text-soft)", marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal glass-card" style={{ padding: 40 }}>
          <h3 style={{ textAlign: "center", marginBottom: 32, fontSize: 20 }}>Flujo de Arquitectura</h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Usuario", color: "var(--text-h)", role: "" },
              { label: "Next.js 15", color: "var(--cyan)", role: "Frontend SPA" },
              { label: "NestJS", color: "var(--purple)", role: "API REST + WS" },
              { label: "Go", color: "var(--orange)", role: "Microservicios" },
              { label: "PostgreSQL", color: "var(--green)", role: "Base de Datos" }
            ].map((box, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {i > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 40, height: 2, background: "var(--gradient)", borderRadius: 1 }} />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                )}
                <div style={{
                  padding: "18px 24px", borderRadius: 14,
                  border: `1px solid ${box.color}40`, background: "var(--bg-surface)",
                  minWidth: 120, textAlign: "center",
                  transition: "all 0.3s ease"
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = box.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${box.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${box.color}40`;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "var(--text-h)", fontWeight: 600 }}>{box.label}</div>
                  {box.role && <div style={{ fontSize: 12, color: "var(--text-soft)", marginTop: 4 }}>{box.role}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

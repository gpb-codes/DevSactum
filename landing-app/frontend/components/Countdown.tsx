"use client";
import { useState, useEffect } from "react";

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launch = new Date("2026-09-30T00:00:00-03:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = launch - now;
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000)
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const timeBlocks = [
    { value: time.days, label: "Días" },
    { value: time.hours, label: "Horas" },
    { value: time.minutes, label: "Minutos" },
    { value: time.seconds, label: "Segundos" }
  ];

  return (
    <section style={{
      padding: "100px 0", textAlign: "center", background: "var(--bg-surface)",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,85,247,0.08) 0%, transparent 60%)"
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "var(--gradient)", opacity: 0.3 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div className="section-label" style={{ justifyContent: "center" }}>LANZAMIENTO</div>
        <h2 className="section-title">Beta se lanza el 30 de Septiembre 2026</h2>
        <p className="section-desc" style={{ marginBottom: 0 }}>La beta abrirá sus puertas y estará disponible para todos. Regístrate ahora para ser de los primeros.</p>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
          {timeBlocks.map((item, i) => (
            <div key={i} style={{
              background: "var(--bg)", border: "1px solid var(--border)",
              borderRadius: 18, padding: "28px 36px", minWidth: 130,
              transition: "all 0.3s ease"
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(168,85,247,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{
                fontSize: 52, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace",
                lineHeight: 1
              }}>
                <span className="gradient-text">{item.value}</span>
              </div>
              <div style={{
                fontSize: 13, color: "var(--text-soft)", marginTop: 10,
                textTransform: "uppercase" as const, letterSpacing: "0.08em", fontWeight: 500
              }}>{item.label}</div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 36, fontSize: 16, color: "var(--text)" }}>
          Faltan <strong style={{ color: "var(--cyan)" }}>{time.days} días</strong> para el lanzamiento oficial de la Beta.
        </p>

        <div style={{ marginTop: 36 }}>
          <a href="https://drakkar-labs.pages.dev/#devsactum" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Regístrate para la Beta
          </a>
        </div>
      </div>
    </section>
  );
}

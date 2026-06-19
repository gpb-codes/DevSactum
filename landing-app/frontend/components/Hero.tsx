"use client";
import { useEffect, useRef, useState } from "react";

function Particles() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${6 + Math.random() * 10}s`,
          animationDelay: `${Math.random() * 8}s`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          background: i % 3 === 0 ? "var(--cyan)" : i % 3 === 1 ? "var(--purple)" : "var(--orange)",
        }} />
      ))}
    </div>
  );
}

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const duration = 2000;
        const start = Date.now();
        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref}>{count}{suffix}</div>;
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", paddingTop: 72
    }} id="home">
      <Particles />

      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168,85,247,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(34,211,238,0.1) 0%, transparent 50%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(251,146,60,0.06) 0%, transparent 50%)"
      }} />

      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "80px 80px", opacity: 0.2,
        maskImage: "radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 80%)",
        transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        transition: "transform 0.3s ease-out"
      }} />

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)",
        transform: `translate(-50%, -50%) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        transition: "transform 0.4s ease-out",
        pointerEvents: "none"
      }} />

      <div style={{
        position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, padding: "40px 24px",
        animation: "fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1)"
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)",
          borderRadius: 100, padding: "8px 20px", fontSize: 14, color: "var(--purple-light)",
          marginBottom: 32, backdropFilter: "blur(8px)",
          animation: "fadeInDown 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both"
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", animation: "pulse 2s infinite", boxShadow: "0 0 8px rgba(74,222,128,0.5)" }}></span>
          Beta Abierta — Septiembre 2026
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 900, letterSpacing: "-0.03em",
          marginBottom: 24, lineHeight: 1.05,
          animation: "fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both"
        }}>
          La Red Social para<br />
          <span className="gradient-text">Desarrolladores</span>
        </h1>

        <p style={{
          fontSize: 19, color: "var(--text)", maxWidth: 620, margin: "0 auto 40px",
          lineHeight: 1.7,
          animation: "fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both"
        }}>
          Conecta, comparte código, debate ideas y construye tu carrera en tecnología.
          Todo lo que necesitas como developer, en una sola plataforma.
        </p>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          animation: "fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both"
        }}>
          <a href="https://drakkar-labs.pages.dev/#devsactum" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            Unirme a la Beta
          </a>
          <a href="#product" className="btn-outline" style={{ fontSize: 16, padding: "16px 36px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            Conocer Más
          </a>
        </div>

        <div style={{
          display: "flex", gap: 56, justifyContent: "center", marginTop: 72, flexWrap: "wrap",
          animation: "fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both"
        }}>
          {[
            { number: 8, suffix: "+", label: "Funcionalidades" },
            { number: 1, suffix: "", label: "Plataforma Unificada" },
            { number: 0, suffix: "", label: "Herramientas Separadas" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 42, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace",
                lineHeight: 1
              }}>
                <span className="gradient-text"><AnimatedCounter end={stat.number} suffix={stat.suffix} /></span>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-soft)", marginTop: 8, letterSpacing: "0.02em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        animation: "float 3s ease-in-out infinite"
      }}>
        <a href="#about" style={{ color: "var(--text-soft)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </a>
      </div>
    </section>
  );
}

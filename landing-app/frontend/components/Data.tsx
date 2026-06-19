"use client";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const numericPart = value.replace(/[^0-9]/g, "");
        const target = parseInt(numericPart, 10);
        if (isNaN(target)) { setDisplayed(value); return; }
        const duration = 2000;
        const start = Date.now();
        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          setDisplayed(value.replace(numericPart, String(current)));
          if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref} style={{ fontSize: 44, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>{displayed}{suffix}</div>;
}

export default function DataSection() {
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
    <section id="data" ref={sectionRef} style={{ padding: "120px 0", background: "var(--bg)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 80px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>DATOS</div>
          <h2 className="section-title">La Problemática que Resolvemos</h2>
          <p className="section-desc">Estadísticas que respaldan por qué DevSactum es necesario. El mercado y los datos nos respaldan.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {[
            { number: "14", color: "var(--purple)", title: "Herramientas por Desarrollador", desc: "Los desarrolladores usan en promedio 14 herramientas diferentes diariamente para hacer su trabajo.", source: "University of Michigan, 2026", icon: "M4 6h16M4 12h16M4 18h16" },
            { number: "40%", color: "var(--cyan)", title: "Pérdida de Productividad", desc: "El cambio constante entre herramientas cuesta hasta el 40% del tiempo productivo de un developer.", source: "ByteIota Research, 2026", icon: "M12 20V10M18 20V4M6 20v-4" },
            { number: "6-15h", color: "var(--orange)", title: "Horas Perdidas Semanales", desc: "El 75% de desarrolladores pierde entre 6 y 15 horas semanales lidiando con herramientas fragmentadas.", source: "Luca Berton, 2026", icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 4v6l4 2" },
            { number: "39K+", color: "var(--purple)", title: "Vacantes Tech en LATAM", desc: "Más de 39 mil vacantes tecnológicas activas en Latinoamérica esperando talento.", source: "Fundación Telefónica, 2025", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
            { number: "65%", color: "var(--cyan)", title: "Crecimiento de Demanda", desc: "La demanda de programadores en LATAM crecerá al menos un 65% en los próximos años.", source: "Revista PYM, 2024", icon: "M23 6l-9.5 9.5-5-5L1 18" },
            { number: "84%", color: "var(--orange)", title: "Empleadores Buscan Talento Digital", desc: "El 84% de empleadores planea mejorar las habilidades digitales de su fuerza laboral.", source: "Foro Económico Mundial, 2025", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }
          ].map((d, i) => (
            <div key={i} className={`reveal stagger-${i + 1} glass-card`} style={{ padding: 36, textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 100, height: 100, borderRadius: "50%",
                background: `${d.color}08`, filter: "blur(30px)"
              }} />
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${d.color}20, ${d.color}08)`,
                border: `1px solid ${d.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px", color: d.color
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d.icon}/></svg>
              </div>
              <div style={{ color: d.color }}>
                <AnimatedNumber value={d.number} />
              </div>
              <h4 style={{ fontSize: 16, marginBottom: 10 }}>{d.title}</h4>
              <p style={{ fontSize: 14, color: "var(--text-soft)", lineHeight: 1.6 }}>{d.desc}</p>
              <div style={{ fontSize: 12, color: "var(--text-soft)", marginTop: 12, fontStyle: "italic", opacity: 0.7 }}>{d.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

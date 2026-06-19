"use client";
import { useEffect, useRef } from "react";

export default function Social() {
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
    <section id="social" ref={sectionRef} style={{ padding: "120px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="reveal" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>SÍGUENOS</div>
          <h2 className="section-title">Conecta con Dräkkar Labs</h2>
          <p className="section-desc">Encuéntranos en nuestras redes sociales. Únete a la comunidad y sé parte del futuro del ecosistema developer en Latinoamérica.</p>
        </div>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            {
              name: "Instagram", url: "https://www.instagram.com/drakkar_labs/", color: "#E4405F",
              icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
              handle: "@drakkar_labs"
            },
            {
              name: "GitHub", url: "https://github.com/gpb-industries/DRAKKAR", color: "#f0f0f0",
              icon: <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></>,
              handle: "gpb-industries/DRAKKAR"
            },
            {
              name: "Sitio Web", url: "https://drakkar-labs.pages.dev/", color: "var(--cyan)",
              icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
              handle: "drakkar-labs.pages.dev"
            }
          ].map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={`reveal stagger-${i + 1} glass-card`} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "20px 32px", borderRadius: 16,
              color: "var(--text-h)", fontSize: 15, fontWeight: 600,
              textDecoration: "none", minWidth: 220
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${typeof s.color === 'string' && s.color.startsWith('#') ? s.color : 'var(--purple)'}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: s.color, flexShrink: 0
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              </div>
              <div>
                <div>{s.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-soft)", fontWeight: 400, marginTop: 2 }}>{s.handle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

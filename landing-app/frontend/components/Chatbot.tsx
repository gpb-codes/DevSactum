"use client";
import { useState, useRef, useEffect } from "react";

const responses: Record<string, string> = {
  hola: "Hola! Bienvenido a Dräkkar Labs. Soy DevBot, tu asistente virtual. Pregúntame sobre DevSactum, el equipo, la beta o cualquier cosa que quieras saber.",
  "que es devsactum": "DevSactum es la red social para desarrolladores. Feed de código con syntax highlighting, bolsa de empleo con IA, comunidades temáticas, portafolios profesionales, chat en tiempo real y herramientas de reputación — todo en una sola plataforma.",
  "quienes somos": "Somos Dräkkar Labs, una startup tecnológica de La Pintana, Santiago de Chile. Fundada por Gabriel Pedreros (CEO) y Pablo Cocío (CTO), ambos estudiantes de Informática con experiencia en ingeniería de software y cloud.",
  beta: "La beta pública se lanza el 30 de septiembre de 2026. Podrás registrarte en nuestra landing para ser de los primeros en acceder a la plataforma.",
  stack: "Stack completo:\n• Frontend: Next.js 15 + React 19 + TypeScript + Tailwind CSS\n• Backend: NestJS (JWT, WebSocket)\n• Microservicios: Go + Gin\n• DB: PostgreSQL\n• Infra: Docker + Cloudflare + CI/CD",
  empleo: "DevSactum tiene una bolsa de empleo integrada con:\n• IA para matching laboral\n• Análisis de CV automático\n• Detección de brechas de habilidades\n• Conexión directa con startups y empresas de LATAM",
  redes: "Encuéntranos en:\n• Instagram: @drakkar_labs\n• GitHub: github.com/gpb-industries/DRAKKAR\n• Web: drakkar-labs.pages.dev",
  contacto: "Puedes contactarnos a través del formulario de contacto en la landing, o escribirnos directamente a drakkarlabs@gmail.com. También estamos en La Pintana, Santiago, Chile.",
  equipo: "Nuestro equipo:\n• Gabriel Pedreros — CEO y Fundador\n• Pablo Cocío — CTO y Co-fundador\nAmbos estudiantes de Informática con pasión por la tecnología.",
  mision: "Nuestra misión es construir infraestructura inteligente y plataformas que permitan escalar tecnología con velocidad, fiabilidad y precisión sin precedentes.",
  valores: "Nuestros valores:\n• Excelencia en Ingeniería\n• Pensamiento Visionario\n• Escala Global\n• Confianza y Seguridad\n• Innovación Incansable\n• Ecosistema Abierto",
  mercado: "El mercado respalda esta necesidad:\n• 39K+ vacantes tech en LATAM\n• 65% de crecimiento en demanda de programadores\n• 84% de empleadores buscan talento digital\n• 14 herramientas usadas por developer en promedio",
  default: "No tengo esa información disponible. Puedes escribirnos a drakkarlabs@gmail.com o usar el formulario de contacto para más detalles."
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; user: boolean }[]>([
    { text: "Hola! Soy DevBot de Dräkkar Labs. Pregúntame sobre DevSactum, la beta, el equipo o cualquier cosa.", user: false }
  ]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, user: true }]);
    setInput("");
    const key = Object.keys(responses).find(k => userMsg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(k)) as keyof typeof responses | undefined;
    setTimeout(() => {
      setMessages(prev => [...prev, { text: (key ? responses[key] : undefined) || responses.default, user: false }]);
    }, 600);
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 200,
        width: 60, height: 60, borderRadius: "50%",
        background: "var(--gradient)", color: "white", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 24px rgba(168,85,247,0.4)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        animation: open ? "none" : "glow 3s ease-in-out infinite"
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: 100, right: 28, zIndex: 200,
          width: 380, maxHeight: 520, borderRadius: 20,
          background: "var(--bg-surface)", border: "1px solid var(--border)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1)"
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 22px", borderBottom: "1px solid var(--border)",
            background: "var(--bg-surface-2)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", background: "var(--gradient)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 800, color: "white"
              }}>DB</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-h)" }}>DevBot</div>
                <div style={{ fontSize: 12, color: "var(--green)", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }}></span>
                  En línea
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "var(--text-soft)", cursor: "pointer", padding: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 12, maxHeight: 350 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                maxWidth: "85%", padding: "12px 16px", borderRadius: 14,
                fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line",
                ...(m.user
                  ? { background: "var(--gradient)", color: "white", alignSelf: "flex-end", borderBottomRightRadius: 4 }
                  : { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-h)", alignSelf: "flex-start", borderBottomLeftRadius: 4 }
                )
              }}>{m.text}</div>
            ))}
            <div ref={messagesEnd} />
          </div>

          <div style={{ display: "flex", gap: 10, padding: "14px 18px", borderTop: "1px solid var(--border)", background: "var(--bg-surface-2)" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1, padding: "12px 16px", background: "var(--bg)",
                border: "1px solid var(--border)", borderRadius: 12,
                color: "var(--text-h)", fontSize: 13, fontFamily: "inherit",
                outline: "none", transition: "border-color 0.2s"
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--purple)"; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }}
            />
            <button onClick={send} style={{
              padding: "12px 18px", background: "var(--gradient)", color: "white",
              border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 600,
              fontSize: 13, transition: "all 0.2s"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

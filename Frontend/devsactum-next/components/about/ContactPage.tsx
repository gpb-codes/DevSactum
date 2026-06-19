"use client"

import { Mail, MapPin, MessageCircle, Send, ExternalLink, Clock } from "lucide-react"
import { useState } from "react"

const CONTACT_METHODS = [
  { icon: Mail, label: "Email", value: "contacto@devsactum.com", href: "mailto:contacto@devsactum.com", color: "text-accent" },
  { icon: MessageCircle, label: "WhatsApp", value: "+52 XXX XXX XXXX", href: "https://wa.me/52XXXXXXXXXX", color: "text-success" },
  { icon: MapPin, label: "Ubicación", value: "Ciudad de México, México", href: null, color: "text-warning" },
  { icon: Clock, label: "Horario", value: "Lun - Vie, 9:00 AM - 6:00 PM", href: null, color: "text-primary" },
]

const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/devsactum", color: "bg-[#24292e]" },
  { name: "Twitter / X", url: "https://x.com/devsactum", color: "bg-[#1da1f2]" },
  { name: "LinkedIn", url: "https://linkedin.com/company/devsactum", color: "bg-[#0077b5]" },
  { name: "Discord", url: "https://discord.gg/devsactum", color: "bg-[#5865f2]" },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 bg-accent-bg border border-accent-border rounded-full px-4 py-1.5 mb-6">
            <Send size={14} className="text-accent" />
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Contáctanos</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text mb-4 leading-tight">
            Hablemos de tu
            <br />
            <span className="text-accent">próximo proyecto</span>
          </h1>
          <p className="text-lg text-text-muted max-w-xl mx-auto">
            ¿Tienes preguntas, sugerencias o quieres colaborar? Estamos aquí para escucharte.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-3 bg-bg-surface border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-text mb-6">Envíanos un mensaje</h2>

            {sent && (
              <div className="bg-success-bg border border-success-border text-success text-sm font-semibold p-4 rounded-xl mb-6">
                Mensaje enviado correctamente. Te responderemos pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Nombre</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg-base border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent transition-colors"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-bg-base border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent transition-colors"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Asunto</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-bg-base border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent transition-colors"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 block">Mensaje</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-bg-base border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent transition-colors min-h-[120px] resize-none"
                  placeholder="Cuéntanos sobre tu idea, pregunta o propuesta..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-[#1a0033] font-bold py-3 rounded-xl hover:opacity-85 transition-opacity cursor-pointer border-none text-sm"
              >
                <Send size={14} className="inline mr-2" />
                Enviar Mensaje
              </button>
            </form>
          </div>

          {/* Info de contacto */}
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_METHODS.map((c) => (
              <div key={c.label} className="bg-bg-surface border border-border rounded-2xl p-5 hover:border-accent-border transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bg-base border border-border flex items-center justify-center shrink-0">
                    <c.icon size={16} className={c.color} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-wider">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm text-text font-semibold hover:text-accent transition-colors flex items-center gap-1">
                        {c.value} <ExternalLink size={10} />
                      </a>
                    ) : (
                      <p className="text-sm text-text font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Redes sociales */}
            <div className="bg-bg-surface border border-border rounded-2xl p-5">
              <h3 className="text-sm font-bold text-text mb-3">Síguenos</h3>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${s.color} text-white text-xs font-bold px-3 py-2 rounded-lg hover:opacity-85 transition-opacity flex items-center gap-1.5`}
                  >
                    {s.name} <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

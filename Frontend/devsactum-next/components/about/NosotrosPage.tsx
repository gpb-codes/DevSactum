"use client"

import { Terminal, Users, Target, Eye, Heart, Code2, Globe, Zap } from "lucide-react"

const TEAM = [
  { name: "Gabriel Pedreros", role: "CEO & Fundador · Backend Developer", initials: "GP", color: "from-accent to-secondary" },
  { name: "Pablo Cocio", role: "CTO & CO-Fundador · Diseñador UX/UI", initials: "PC", color: "from-primary to-accent" },
  { name: "Fernando Ibañez", role: "DB Admin", initials: "FI", color: "from-success to-primary" },
]

const VALUES = [
  { icon: Code2, title: "Código Limpio", desc: "Promovemos buenas prácticas y estándares de calidad en cada línea." },
  { icon: Users, title: "Comunidad", desc: "Creemos en el poder de colaborar y compartir conocimiento." },
  { icon: Zap, title: "Innovación", desc: "Adoptamos nuevas tecnologías para resolver problemas reales." },
  { icon: Heart, title: "Pasión", desc: "Cada desarrollador merece una plataforma que entienda su vocación." },
]

export default function NosotrosPage() {
  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 bg-accent-bg border border-accent-border rounded-full px-4 py-1.5 mb-6">
            <Terminal size={14} className="text-accent" />
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Sobre Nosotros</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-text mb-4 leading-tight">
            Donde los developers
            <br />
            <span className="text-accent">construyen futuro</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            Somos un equipo de desarrolladores queidentificó la necesidad de una plataforma
            hecha por developers, para developers. No somos solo una red social — somos
            un ecosistema completo para impulsar tu carrera tech.
          </p>
        </div>

        {/* Visión / Misión */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="bg-bg-surface border border-border rounded-2xl p-6 hover:border-accent-border transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-bg border border-accent-border flex items-center justify-center">
                <Eye size={18} className="text-accent" />
              </div>
              <h3 className="text-lg font-bold text-text">Nuestra Visión</h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Ser la plataforma líder para desarrolladores en Latinoamérica, donde cada
              profesional tech pueda construir su marca personal, encontrar oportunidades
              laborales y crecer junto a una comunidad activa y colaborativa.
            </p>
          </div>
          <div className="bg-bg-surface border border-border rounded-2xl p-6 hover:border-primary-border transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-bg border border-primary-border flex items-center justify-center">
                <Target size={18} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text">Nuestra Misión</h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Democratizar el acceso a oportunidades laborales y de networking para
              desarrolladores, proporcionando herramientas de validación técnica, portafolio
              integrado y matching laboral impulsado por inteligencia artificial.
            </p>
          </div>
        </div>

        {/* La necesidad */}
        <div className="bg-bg-surface border border-border rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-black text-text mb-4 flex items-center gap-3">
            <Globe size={24} className="text-secondary" />
            ¿Qué necesidad detectamos?
          </h2>
          <div className="space-y-4 text-text-muted text-sm leading-relaxed">
            <p>
              Según estudios recientes, <strong className="text-accent">el 73% de los desarrolladores</strong> en
              Latinoamérica consideran que no existen plataformas que conecten directamente
              su habilidad técnica con oportunidades laborales relevantes.
            </p>
            <p>
              Las redes sociales generalistas como LinkedIn no están diseñadas para el
              workflow de un developer: no hay manera de mostrar código, validar habilidades
              técnicas de forma objetiva, ni encontrar proyectos freelance que coincidan
              con tu stack tecnológico específico.
            </p>
            <p>
              Artículos de <strong className="text-primary">Stack Overflow Developer Survey 2024</strong> y
              reportes de <strong className="text-primary">GitHub Octoverse</strong> confirman que la comunidad
              de developers busca activamente espacios especializados donde puedan
              compartir proyectos, colaborar y crecer profesionalmente.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-text mb-6 text-center">Nuestros Valores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-bg-surface border border-border rounded-2xl p-5 text-center hover:border-accent-border transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent-bg border border-accent-border flex items-center justify-center mx-auto mb-3">
                  <v.icon size={20} className="text-accent" />
                </div>
                <h4 className="text-sm font-bold text-text mb-1">{v.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-text mb-6 text-center">Nuestro Equipo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-bg-surface border border-border rounded-2xl p-6 text-center hover:border-accent-border transition-colors">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 border-2 border-bg-base`}>
                  <span className="text-2xl font-black text-white">{member.initials}</span>
                </div>
                <h4 className="text-sm font-bold text-text mb-1">{member.name}</h4>
                <p className="text-xs text-accent font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="bg-bg-surface border border-border rounded-2xl p-8 text-center">
          <h2 className="text-xl font-black text-text mb-4">Stack Tecnológico</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Next.js 15", "TypeScript", "Tailwind CSS 4", "Go + Gin", "NestJS", "PostgreSQL", "Docker", "WebSocket"].map((tech) => (
              <span key={tech} className="bg-accent-bg border border-accent-border text-accent text-xs font-bold px-3 py-1.5 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

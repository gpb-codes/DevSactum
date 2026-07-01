"use client"

import React from "react"
import {
  Terminal, Database, CheckCircle, Zap, Brain, Palette,
  Gauge, Star, Code,
} from "lucide-react"
import { useNav } from "@/context/NavContext"
import { GradientHeading } from "@/components/ui/gradient-heading"

const FREE_FEATURES = [
  { icon: CheckCircle, text: "Public repository access" },
  { icon: CheckCircle, text: "Standard profile visibility" },
  { icon: CheckCircle, text: "Community support" },
]

const PRO_FEATURES = [
  { icon: Zap, text: "Private code sandboxes" },
  { icon: Brain, text: "AI Pair Programmer (Gpt-4o)" },
  { icon: Palette, text: "Custom IDE & Profile themes" },
  { icon: Gauge, text: "Priority CI/CD build queue" },
]

const TESTIMONIALS = [
  {
    quote: "The AI pair programmer alone saved me 12 hours on my last microservice migration. Worth every penny.",
    initials: "AR",
    name: "Alex Rivera",
    role: "Staff Engineer @ NexaCorp",
    color: "var(--color-accent)",
    bg: "var(--color-accent-bg)",
  },
  {
    quote: "Private sandboxes are a game changer for prototyping. The themes make DevSanctum feel like my actual desk.",
    initials: "SC",
    name: "Sarah Chen",
    role: "Principal Architect",
    color: "var(--color-secondary)",
    bg: "var(--color-secondary-soft)",
  },
]

export default function MemberProPage() {
  const { setActivePage } = useNav()

  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto animate-fade-in space-y-10">

      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-hover border border-border">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[10px] font-bold text-text uppercase tracking-widest">System Ready</span>
        </div>
        <h1 className="text-[42px] font-black tracking-[-2px] leading-tight">
          DevSanctum <br /><span className="text-accent italic">for Devs</span>
        </h1>
        <p className="text-text text-[14px] max-w-[280px] mx-auto opacity-80">
          Master your craft with production-grade environments and elite architectural tools.
        </p>
      </section>

      {/* Code Visual */}
      <div
        className="bg-black border border-accent-border rounded-xl p-4 relative overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width * 10).toFixed(0)
          const y = ((e.clientY - rect.top) / rect.height * 10).toFixed(0)
          e.currentTarget.style.boxShadow = `inset ${x}px ${y}px 30px rgba(251,146,60,0.05)`
        }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none" }}
      >
        <div className="flex gap-1.5 mb-4 border-b border-border pb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-[10px] text-text opacity-20">membership.sh</span>
        </div>
        <pre className="font-mono text-[12px] text-accent space-y-1">
          <div>
            <span className="opacity-40">01</span>{" "}
            <span className="text-secondary">import</span> {'{'} Architect {'}'}{" "}
            <span className="text-secondary">from</span> '@sanctum/core';
          </div>
          <div><span className="opacity-40">02</span> </div>
          <div>
            <span className="opacity-40">03</span>{" "}
            <span className="text-secondary">const</span> user = Architect.init({'\{'}
          </div>
          <div>
            <span className="opacity-40">04</span>   tier: <span className="text-text-h">'SYSTEM_ARCHITECT'</span>,
          </div>
          <div>
            <span className="opacity-40">05</span>   ai_pair: <span className="text-text-h">true</span>,
          </div>
          <div>
            <span className="opacity-40">06</span>   ci_priority: <span className="text-text-h">999</span>
          </div>
          <div>
            <span className="opacity-40">07</span> {'}'});
          </div>
        </pre>
        <div className="absolute bottom-0 right-0 p-4 opacity-10 pointer-events-none">
          <Database size={60} className="text-accent" strokeWidth={1} />
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 gap-6">

        {/* Free Tier */}
        <div className="bg-bg-surface border border-border rounded-2xl p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <GradientHeading variant="default" size="md" className="m-0">Open Source</GradientHeading>
              <p className="text-text text-[12px] opacity-60 mt-0.5">Essential Dev Tools</p>
            </div>
            <div className="text-[24px] font-black text-text-h">
              $0<span className="text-[12px] font-medium text-text opacity-60">/mo</span>
            </div>
          </div>
          <ul className="space-y-4">
            {FREE_FEATURES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <Icon size={16} className="text-secondary shrink-0" strokeWidth={2} />
                <span className="text-[12px] text-text">{text}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setActivePage("Membresía Dev")}
            className="w-full py-4 border border-border rounded-xl text-[12px] font-bold text-text hover:bg-bg-hover transition-all cursor-pointer"
          >
            Initialize Basic
          </button>
        </div>

        {/* Pro Tier */}
        <div className="relative rounded-2xl p-[2px] bg-[conic-gradient(var(--cosmic-from),var(--cosmic-via),var(--cosmic-to))] animate-hue-shift">
          <div className="bg-bg-surface rounded-[22px] p-6 space-y-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
              <Star size={80} className="text-accent" fill="currentColor" strokeWidth={0} />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <div className="inline-block px-2 py-0.5 bg-accent-bg border border-accent-border rounded mb-2">
                  <span className="text-[10px] font-bold text-accent tracking-widest uppercase">Recommended</span>
                </div>
                <GradientHeading variant="warm" size="md" className="m-0">System Architect</GradientHeading>
                <p className="text-accent text-[12px] mt-0.5">High-Performance Workflow</p>
              </div>
              <div className="text-[24px] font-black text-text-h shrink-0">
                $15<span className="text-[12px] font-medium text-accent/60">/mo</span>
              </div>
            </div>
            <ul className="space-y-4">
              {PRO_FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon size={16} className="text-accent shrink-0" strokeWidth={1.5} />
                  <span className="text-[12px] text-text-h">{text}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActivePage("Membresía Dev")}
              className="w-full py-4 rounded-xl text-[12px] font-extrabold cursor-pointer border-none transition-all"
              style={{
                background: "linear-gradient(135deg, #fb923c, #f97316)",
                color: "#1a0033",
                boxShadow: "0 0 20px rgba(251,146,60,0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.filter = "brightness(1.1)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(1)" }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)" }}
              onMouseUp={e => { e.currentTarget.style.transform = "scale(1.02)" }}
            >
              UPGRADE TO PRO
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h4 className="text-[12px] font-bold uppercase tracking-tight text-text opacity-60">Verified Logs</h4>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-success" />
            <span className="font-mono text-[10px] text-success/80">99.9% Uptime</span>
          </div>
        </div>
        <div className="space-y-4 animate-stagger">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-bg-hover p-4 rounded-xl border-l-2" style={{ borderLeftColor: t.color }}>
              <p className="text-[13.5px] text-text leading-[1.6] italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[12px] font-black shrink-0 border border-border"
                  style={{ background: t.bg, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[12px] font-bold text-text-h m-0">{t.name}</p>
                  <p className="text-[10px] text-text opacity-60 m-0">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 pb-10 border-t border-border space-y-8">
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <h5 className="text-[10px] font-bold text-text-h uppercase tracking-[1px] mb-3">System</h5>
            <ul className="space-y-2">
              <li>
                <button className="text-text opacity-60 hover:text-accent transition-colors text-[10px] font-bold bg-transparent border-none cursor-pointer p-0">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-text opacity-60 hover:text-accent transition-colors text-[10px] font-bold bg-transparent border-none cursor-pointer p-0">
                  Privacy Protocol
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold text-text-h uppercase tracking-[1px] mb-3">Resources</h5>
            <ul className="space-y-2">
              <li>
                <button className="text-text opacity-60 hover:text-accent transition-colors text-[10px] font-bold bg-transparent border-none cursor-pointer p-0">
                  System Status
                </button>
              </li>
              <li>
                <button className="text-text opacity-60 hover:text-accent transition-colors text-[10px] font-bold bg-transparent border-none cursor-pointer p-0">
                  Direct Support
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <span className="text-[10px] font-bold text-tertiary tracking-widest">
            &copy; 2024 DEVSANCTUM // SYSTEMS SECURED
          </span>
          <div className="flex justify-center gap-4 text-text opacity-40">
            <Terminal size={16} strokeWidth={1.5} />
            <Code size={16} strokeWidth={1.5} />
            <Database size={16} strokeWidth={1.5} />
          </div>
        </div>
      </footer>
    </div>
  )
}

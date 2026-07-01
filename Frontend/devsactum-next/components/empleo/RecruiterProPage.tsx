"use client"

import React from "react"
import {
  Terminal, BarChart3, Search, Users, Star,
  CheckCircle, Quote, Sparkles, Database,
  Code, TrendingUp,
} from "lucide-react"
import { GradientHeading } from "@/components/ui/gradient-heading"

const COMPANIES = ["Zenith AI", "Nexus Core", "PHOENIX//SYSTEMS", "VECTOR_LABS"]

const SCOUT_FEATURES = [
  "Advanced search filters",
  "5 monthly reach-outs",
  "Verified skill badges",
]

const PRO_FEATURES = [
  "Unlimited reach-outs",
  "Top 5% Architect access",
  "Deep technical reports",
  "Dedicated Account Manager",
]

export default function RecruiterProPage() {
  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto animate-fade-in">

      {/* Hero */}
      <section className="relative pt-12 pb-8 text-center overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-soft border border-secondary/20 text-secondary mb-6 text-[12px] font-bold">
            <Sparkles size={14} className="mr-2" strokeWidth={2} fill="currentColor" />
            RECRUITER PLATFORM
          </div>
          <h1 className="text-[42px] font-black tracking-[-2px] leading-tight mb-4">
            DevSanctum <br /><span className="text-secondary italic">for Recruiters</span>
          </h1>
          <p className="text-text text-[14px] max-w-md mx-auto mb-8 opacity-80">
            Stop sifting through noise. Find the <span className="text-secondary font-bold">1% of technical talent</span> through verified assessment data and hardware-validated skills.
          </p>
          <div className="flex justify-center gap-3">
            <button
              className="px-6 py-3 rounded-xl text-[12px] font-bold cursor-pointer border-none transition-all"
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
              View Pricing
            </button>
            <button className="px-6 py-3 rounded-xl text-[12px] font-bold cursor-pointer border border-border bg-bg-surface text-text hover:bg-bg-hover transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Metric Cards */}
      <section className="grid grid-cols-2 gap-3 mb-12">
        <div className="col-span-2 bg-bg-surface border border-border p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <BarChart3 size={60} className="text-accent" strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <h3 className="text-[15px] font-bold text-accent mb-1">Talent Pipeline</h3>
            <p className="text-[10px] font-bold text-text uppercase tracking-widest mb-4">Real-time Verified Pool</p>
            <div className="flex items-end gap-2">
              <span className="text-[30px] font-black text-text-h">12,482</span>
              <span className="text-secondary font-bold mb-1 text-[13px]">+14%</span>
            </div>
          </div>
        </div>
        <div className="bg-bg-surface border border-border p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Search size={20} className="text-secondary" strokeWidth={1.5} />
          </div>
          <p className="text-[10px] font-bold text-text uppercase tracking-widest mb-1">Search Precision</p>
          <p className="text-[24px] font-black text-text-h">99.8%</p>
        </div>
        <div className="bg-bg-surface border border-border p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <Users size={20} className="text-tertiary" strokeWidth={1.5} />
          </div>
          <p className="text-[10px] font-bold text-text uppercase tracking-widest mb-1">Active Leads</p>
          <p className="text-[24px] font-black text-text-h">412</p>
        </div>
      </section>

      {/* Radar / Visual Feature */}
      <section className="mb-12">
        <div className="rounded-2xl border-border overflow-hidden relative" style={{ padding: 2, background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2))" }}>
          <div className="rounded-[22px] bg-bg p-6 relative overflow-hidden"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(93,230,255,0.08) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-48 h-48 rounded-full border border-secondary/30 flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 border-t-2 border-secondary/60 rounded-full animate-cosmic-spin" />
                <div className="w-32 h-32 rounded-full border border-secondary/20 flex items-center justify-center">
                  <TrendingUp size={40} className="text-secondary" strokeWidth={1.5} />
                </div>
              </div>
              <GradientHeading variant="cool" size="md" className="text-center mb-2">Architect-Grade Intelligence</GradientHeading>
              <p className="text-text text-[13.5px] text-center max-w-md opacity-80">
                Access deep technical telemetry including code velocity, architecture patterns, and peer review history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="space-y-6 mb-16">
        <GradientHeading variant="accent" size="lg" className="text-center mb-8">Access Protocols</GradientHeading>

        {/* Talent Scout */}
        <div className="bg-bg-surface border border-border p-8 rounded-3xl relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <GradientHeading variant="default" size="md" className="m-0">Talent Scout</GradientHeading>
              <p className="text-text text-[12px] opacity-60">Essential hiring toolkit</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[30px] font-black text-accent">$49</span>
              <span className="text-text text-[12px] opacity-60">/mo</span>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            {SCOUT_FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-secondary shrink-0" strokeWidth={1.5} />
                <span className="text-[13.5px] text-text">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-4 rounded-xl text-[12px] font-bold cursor-pointer border border-border text-text hover:bg-bg-hover transition-all">
            Initialize Subscription
          </button>
        </div>

        {/* Headhunter Pro */}
        <div className="relative rounded-3xl p-[2px] bg-[conic-gradient(var(--cosmic-from),var(--cosmic-via),var(--cosmic-to))] animate-hue-shift overflow-hidden">
          <div className="bg-bg-surface rounded-[22px] p-8 relative">
            <div className="absolute top-4 right-6 px-3 py-1 rounded-full bg-[rgba(173,250,27,0.2)] border border-[rgba(173,250,27,0.3)] text-[rgb(173,250,27)] text-[10px] font-bold uppercase tracking-widest">
              Most Powerful
            </div>
            <div className="flex justify-between items-start mb-6 mt-4">
              <div>
                <GradientHeading variant="cool" size="md" className="m-0">Headhunter Pro</GradientHeading>
                <p className="text-secondary text-[12px] opacity-80">The elite architect tier</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[30px] font-black text-secondary">$199</span>
                <span className="text-text text-[12px] opacity-60">/mo</span>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              {PRO_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <Star size={18} className="text-accent shrink-0" strokeWidth={1.5} fill="currentColor" />
                  <span className="text-[13.5px] text-text-h font-bold">{f}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full py-4 rounded-xl text-[12px] font-bold cursor-pointer border-none transition-all"
              style={{
                background: "#adfa1b",
                color: "#001f25",
                boxShadow: "0 0 20px rgba(173,250,27,0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.filter = "brightness(1.1)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(1)" }}
              onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)" }}
              onMouseUp={e => { e.currentTarget.style.transform = "scale(1.02)" }}
            >
              Activate Pro Node
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mb-12">
        <p className="text-[10px] font-bold text-text uppercase tracking-[0.2em] text-center mb-8 opacity-60">
          TRUSTED BY THE ARCHITECTS AT
        </p>
        <div className="grid grid-cols-2 gap-4 opacity-60 hover:opacity-100 transition-opacity">
          {COMPANIES.map((name) => (
            <div key={name} className="flex items-center justify-center p-4 border border-border rounded-xl bg-bg-surface">
              <span className="text-text-h font-black tracking-tighter text-[14px]">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mb-12">
        <div className="bg-bg-surface border border-border p-6 rounded-2xl">
          <Quote size={20} className="text-accent mb-3 opacity-60" strokeWidth={1.5} />
          <p className="text-text text-[13.5px] leading-[1.6] italic mb-4">
            &ldquo;The Headhunter Pro access reduced our hiring time from 4 months to 3 weeks. Being able to see hardware-validated assessment reports before even starting a screening call is the competitive edge we needed.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-bg-hover border border-border flex items-center justify-center text-[14px] font-black text-accent shrink-0">
              MV
            </div>
            <div>
              <p className="text-[12px] font-bold text-text-h m-0">Marcus Vane</p>
              <p className="text-[10px] text-text opacity-60 m-0">Senior Technical Talent Lead, Phoenix Systems</p>
            </div>
          </div>
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
            &copy; 2024 DEVSANCTUM // ALL RIGHTS RESERVED
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

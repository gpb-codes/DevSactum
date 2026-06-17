"use client"

import React, { useState } from "react"
import { ExternalLink, Terminal, Shield, Database, MessageSquare, Heart, UserPlus, Mail, Star, GitFork } from "lucide-react"
import { useNav } from "@/context/NavContext"

const REPOS = [
  { name: "lumina-engine",  desc: "High-performance async runtime for WebAssembly modules in edge environments.", lang: "Rust", langColor: "#f97316", stars: "12.4k", forks: "892",  Icon: Terminal, wide: false },
  { name: "guardian-proxy", desc: "Layer 7 smart proxy with built-in eBPF observability and TLS termination.",   lang: "Go",   langColor: "#60a5fa", stars: "4.2k",  forks: "215",  Icon: Shield,   wide: false },
  { name: "vector-db-core", desc: "Core engine for vector similarity search using HNSW indexing and SIMD acceleration.", lang: "C++", langColor: "#f87171", stars: "28.1k", forks: "1.4k", Icon: Database, wide: true  },
]

const POSTS = [
  { title: "Why We Migrated Our Edge Runtime to Rust: A Deep Dive into Memory Safety", date: "Oct 24, 2023", text: "After three years of managing a complex C++ codebase for our edge nodes, the technical debt of manual memory management reached a breaking point.", comments: 42, likes: "1.2k", active: true },
  { title: "The Future of Decentralized Infrastructure and the Death of Monoliths",   date: "Sep 12, 2023", text: "Distributed systems are often harder than they need to be. By leveraging modern networking protocols like QUIC, we can rethink how services discover and talk to each other.", comments: 18, likes: "843", active: false },
]

const SKILLS = [
  { label: "Distributed Logic",  pct: 98 },
  { label: "Kernel Programming", pct: 92 },
  { label: "Cloud Native Ops",   pct: 85 },
]

const HEATMAP = [0, 20, 40, 0, 60, 10, 100, 0, 0, 30, 50, 20, 0, 10, 40, 80, 20, 0, 10, 20, 100]

export default function ProfilePage() {
  const { setActivePage } = useNav()
  const [following, setFollowing] = useState(false)

  return (
    <div className="px-6 py-6 max-w-[1100px] mx-auto">

      {/* Hero banner */}
      <header className="bg-bg-surface border border-border rounded-[14px] overflow-hidden mb-6 relative min-h-[320px]">
        {/* Banner */}
        <div className="h-[180px] relative" style={{ background: "linear-gradient(135deg, #1a0a3a, #2a0060, #0a1a4a)" }}>
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 180" fill="none">
            <path d="M0 90 Q200 20 400 90 Q600 160 800 90" stroke="#c49aff" strokeWidth="1" opacity=".6"/>
            <path d="M0 120 Q300 50 600 120 Q700 140 800 100" stroke="#7c6fe0" strokeWidth=".6" opacity=".4"/>
            <circle cx="400" cy="90" r="4" fill="#c49aff" opacity=".8"/>
            <circle cx="200" cy="50" r="2" fill="#c49aff" opacity=".5"/>
            <circle cx="600" cy="130" r="3" fill="#ff94a8" opacity=".5"/>
          </svg>
        </div>

        {/* Avatar + info */}
        <div className="px-7 pb-7 relative">
          <div className="flex items-end gap-5 -mt-14">
            <div className="w-[100px] h-[100px] rounded-[14px] bg-accent-bg border-[3px] border-bg-surface flex items-center justify-center text-[32px] font-black text-accent shrink-0">
              AV
            </div>
            <div className="pb-1">
              <h1 className="text-[28px] font-black tracking-[-1px] text-text-h m-0 mb-1">Alex Volkov</h1>
              <p className="text-[12px] text-accent font-bold m-0">Principal Distributed Systems Architect</p>
            </div>
            <div className="ml-auto flex gap-2 pb-1">
              <button
                onClick={() => setFollowing(!following)}
                className={`flex items-center gap-1.5 border border-accent rounded-lg px-4 py-2 text-[12px] font-bold cursor-pointer transition-colors duration-150 ${
                  following ? "bg-transparent text-accent" : "bg-accent text-[#1a0033]"
                }`}
              >
                <UserPlus size={13} strokeWidth={2} /> {following ? "Siguiendo" : "Follow"}
              </button>
              <button
                onClick={() => setActivePage("Chat")}
                className="flex items-center gap-1.5 bg-bg-hover text-text-h border border-border rounded-lg px-4 py-2 text-[12px] font-bold cursor-pointer hover:border-accent-border transition-colors duration-150"
              >
                <Mail size={13} strokeWidth={2} /> Message
              </button>
            </div>
          </div>

          <p className="text-[13px] text-text leading-[1.7] max-w-[600px] mt-3.5 mb-3.5">
            Building resilient infrastructure at global scale. Contributor to various open-source kernel modules and low-latency networking protocols. Minimalist by design, architect by trade.
          </p>

          <div className="flex gap-2 flex-wrap">
            {["Rust", "Go", "Kubernetes", "Wasm", "eBPF"].map((tag) => (
              <span key={tag} className="bg-accent-bg text-accent border border-accent-border text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-[1px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Grid principal */}
      <div className="grid grid-cols-[1fr_320px] gap-5">

        {/* Columna izquierda */}
        <div className="flex flex-col gap-5">

          {/* Repositorios */}
          <section className="bg-bg-surface border border-border rounded-[14px] p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[1.5px] text-text-h m-0">Top Repositories</h2>
              <button className="flex items-center gap-1 bg-transparent border-none text-accent text-[11px] font-bold cursor-pointer">
                View GitHub <ExternalLink size={11} strokeWidth={2} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {REPOS.map((r) => (
                <div
                  key={r.name}
                  className={`bg-bg-hover border border-border rounded-[10px] p-4 cursor-pointer transition-colors duration-150 hover:border-accent-border ${r.wide ? "col-span-2" : "col-span-1"}`}
                >
                  <div className="flex justify-between mb-2.5">
                    <r.Icon size={22} className="text-accent" strokeWidth={1.6} />
                    <span className="text-[9px] font-bold uppercase tracking-[1px] text-text">Public</span>
                  </div>
                  <div className="text-[14px] font-extrabold text-text-h mb-1.5">{r.name}</div>
                  <div className="text-[11px] text-text leading-[1.6] mb-3">{r.desc}</div>
                  <div className="flex gap-3.5 text-[11px] font-mono text-text">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: r.langColor }} /> {r.lang}
                    </span>
                    <span className="flex items-center gap-0.5"><Star size={11} strokeWidth={1.8} /> {r.stars}</span>
                    <span className="flex items-center gap-0.5"><GitFork size={11} strokeWidth={1.8} /> {r.forks}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Insights */}
          <section className="bg-bg-surface border border-border rounded-[14px] p-5">
            <h2 className="text-[13px] font-extrabold uppercase tracking-[1.5px] text-text-h m-0 mb-5">Recent Insights</h2>
            <div className="flex flex-col">
              {POSTS.map((p, i) => (
                <article key={p.title} className={`flex gap-4 py-5 relative pl-7 ${i < POSTS.length - 1 ? "border-b border-border" : ""}`}>
                  <div className={`absolute left-0 top-6 w-3 h-3 rounded-full border-2 ${p.active ? "bg-accent border-accent" : "bg-border border-border"}`} />
                  <div>
                    <div className={`text-[10px] font-bold uppercase tracking-[1px] mb-2 ${p.active ? "text-accent" : "text-text"}`}>{p.date}</div>
                    <h3 className="text-[16px] font-extrabold text-text-h leading-[1.35] m-0 mb-2 cursor-pointer hover:text-accent transition-colors duration-150">{p.title}</h3>
                    <p className="text-[12px] text-text leading-[1.65] m-0 mb-3">{p.text}</p>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1 text-[11px] font-bold text-text"><MessageSquare size={13} strokeWidth={1.8} /> {p.comments}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-text"><Heart size={13} strokeWidth={1.8} /> {p.likes}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Columna derecha — sidebar */}
        <div className="flex flex-col gap-4">

          {/* Stats seguidores */}
          <div className="bg-bg-surface border border-border rounded-[14px] p-5">
            <div className="flex justify-around">
              {[["4.8k", "Followers"], ["124", "Following"], ["1.4k", "Posts"]].map(([val, lbl]) => (
                <div key={lbl} className="text-center">
                  <div className="text-[20px] font-black text-text-h tracking-[-0.5px]">{val}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-text mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust score */}
          <div className="bg-bg-surface border border-border rounded-[14px] p-5 text-center">
            <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-4">Network Reputation</div>
            <div className="relative w-[110px] h-[110px] mx-auto mb-3">
              <svg width="110" height="110" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r="46" fill="none" stroke="var(--color-bg-hover)" strokeWidth="8"/>
                <circle cx="55" cy="55" r="46" fill="none" stroke="var(--color-accent)" strokeWidth="8"
                  strokeDasharray="289" strokeDashoffset="29"
                  strokeLinecap="round" transform="rotate(-90 55 55)"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[26px] font-black text-text-h">99</span>
                <span className="text-[9px] font-bold uppercase tracking-[1px] text-accent">Trust</span>
              </div>
            </div>
            <p className="text-[11px] text-text leading-[1.6] m-0">Ranked in the top 0.1% of systems architects globally.</p>
          </div>

          {/* Heatmap de actividad */}
          <div className="bg-bg-surface border border-border rounded-[14px] p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-3">Global Activity</div>
            <div className="grid grid-cols-7 gap-[3px]">
              {HEATMAP.map((v, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[3px]"
                  style={{ background: v === 0 ? "var(--color-bg-hover)" : `rgba(196,154,255,${v / 100})` }}
                />
              ))}
            </div>
            <p className="text-[10px] text-text font-mono mt-2.5">1,402 contributions in the last year</p>
          </div>

          {/* Stack proficiency */}
          <div className="bg-bg-surface border border-border rounded-[14px] p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text mb-3.5">Stack Proficiency</div>
            <div className="flex flex-col gap-3">
              {SKILLS.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-[10px] font-mono text-text uppercase mb-1">
                    <span>{s.label}</span><span>{s.pct}%</span>
                  </div>
                  <div className="h-1 bg-bg-hover rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity pulse */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-bg-surface border border-accent-border rounded-full px-3.5 py-1.5 z-50">
        <div className="w-2 h-2 rounded-full bg-tertiary shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text-h">Node Status: Active</span>
      </div>
    </div>
  )
}
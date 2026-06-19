"use client"

import React, { useState, useEffect, useRef } from "react"
import { ExternalLink, Terminal, Shield, Database, MessageSquare, Heart, UserPlus, Mail, Star, GitFork } from "lucide-react"
import { useNav } from "@/src/store/nav"
import { Badge } from "@/src/components/ui/Badge"
import { Avatar } from "@/src/components/ui/Avatar"
import { Button } from "@/src/components/ui/Button"

const REPOS = [
  { name: "lumina-engine",  desc: "High-performance async runtime for WebAssembly modules in edge environments.", lang: "Rust", langColor: "#f97316", stars: "12.4k", forks: "892",  Icon: Terminal, wide: false },
  { name: "guardian-proxy", desc: "Layer 7 smart proxy with built-in eBPF observability and TLS termination.",   lang: "Go",   langColor: "#60a5fa", stars: "4.2k",  forks: "215",  Icon: Shield,   wide: false },
  { name: "vector-db-core", desc: "Core engine for vector similarity search using HNSW indexing and SIMD acceleration.", lang: "C++", langColor: "#f87171", stars: "28.1k", forks: "1.4k", Icon: Database, wide: true  },
]

const POSTS = [
  { title: "Why We Migrated Our Edge Runtime to Rust", date: "Oct 24, 2023", text: "After three years of managing a complex C++ codebase for our edge nodes, the technical debt of manual memory management reached a breaking point.", comments: 42, likes: "1.2k", active: true },
  { title: "The Future of Decentralized Infrastructure",   date: "Sep 12, 2023", text: "Distributed systems are often harder than they need to be. By leveraging modern networking protocols like QUIC, we can rethink how services discover and talk to each other.", comments: 18, likes: "843", active: false },
]

const SKILLS = [
  { label: "Distributed Logic",  pct: 98 },
  { label: "Kernel Programming", pct: 92 },
  { label: "Cloud Native Ops",   pct: 85 },
]

const HEATMAP = [0, 20, 40, 0, 60, 10, 100, 0, 0, 30, 50, 20, 0, 10, 40, 80, 20, 0, 10, 20, 100]

function AnimatedStat({ target, label: lbl }: { target: string; label: string }) {
  const [display, setDisplay] = useState("0")
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const num = parseFloat(target.replace(/[Kk]/g, ""))
    const hasK = /[Kk]/.test(target)
    const totalFrames = 40
    let frame = 0
    const interval = setInterval(() => {
      frame++
      const progress = Math.min(frame / totalFrames, 1)
      const current = Math.round(num * progress)
      setDisplay(current + (hasK && progress < 1 ? "" : hasK ? "k" : ""))
      if (progress >= 1) {
        clearInterval(interval)
        setDisplay(target)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [target])

  return (
    <div className="text-center">
      <div className="text-xl font-black text-[var(--text-h)] tracking-[-0.5px]">{display}</div>
      <div className="text-[10px] font-bold uppercase tracking-[1px] text-[var(--text-soft)] mt-0.5">{lbl}</div>
    </div>
  )
}

export default function ProfilePage() {
  const { setActivePage } = useNav()
  const [following, setFollowing] = useState(false)

  return (
    <div className="px-6 py-6 max-w-[1100px] mx-auto">
      <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-[var(--radius-3xl)] overflow-hidden mb-6 relative">
        <div className="h-[200px] relative overflow-hidden">
          <div
            className="absolute inset-0 animate-gradient-shift"
            style={{
              background: "linear-gradient(135deg, #1a0a3a 0%, #2a0060 30%, #0a1a4a 60%, #0a0a2a 100%)",
              backgroundSize: "200% 200%",
              animation: "gradientShift 8s ease infinite",
            }}
          />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none">
            <path d="M0 120 Q200 60 400 110 Q600 160 800 100 Q1000 40 1200 90 L1200 200 L0 200 Z" fill="rgba(168,85,247,0.08)">
              <animate attributeName="d" dur="10s" repeatCount="indefinite"
                values="M0 120 Q200 60 400 110 Q600 160 800 100 Q1000 40 1200 90 L1200 200 L0 200 Z;
                        M0 130 Q200 90 400 100 Q600 140 800 110 Q1000 70 1200 100 L1200 200 L0 200 Z;
                        M0 120 Q200 60 400 110 Q600 160 800 100 Q1000 40 1200 90 L1200 200 L0 200 Z" />
            </path>
            <path d="M0 150 Q300 110 600 140 Q900 170 1200 120 L1200 200 L0 200 Z" fill="rgba(34,211,238,0.04)" />
          </svg>
        </div>

        <div className="px-8 pb-8 relative">
          <div className="flex items-end gap-6 -mt-[50px]">
            <Avatar initials="AV" color="var(--primary)" bg="var(--primary-soft)" size="xl" shape="rounded" />
            <div className="pb-1">
              <h1 className="text-[32px] font-black tracking-[-1px] text-[var(--text-h)] m-0 mb-0.5">Alex Volkov</h1>
              <p className="text-sm text-[var(--primary)] font-bold m-0">
                Principal Distributed Systems Architect
              </p>
            </div>
            <div className="ml-auto flex gap-2 pb-1">
              <Button
                variant={following ? "outline" : "primary"}
                size="sm"
                onClick={() => setFollowing(!following)}
                icon={<UserPlus size={13} strokeWidth={2} />}
              >
                {following ? "Siguiendo" : "Seguir"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActivePage("Chat")}
                icon={<Mail size={13} strokeWidth={2} />}
              >
                Mensaje
              </Button>
            </div>
          </div>

          <p className="text-sm text-[var(--text)] leading-[1.7] max-w-[600px] mt-4 mb-4">
            Building resilient infrastructure at global scale. Contributor to various open-source kernel modules and low-latency networking protocols. Minimalist by design, architect by trade.
          </p>

          <div className="flex gap-2 flex-wrap">
            {["Rust", "Go", "Kubernetes", "Wasm", "eBPF"].map(tag => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-5">

        <div className="flex flex-col gap-5">

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xs font-extrabold uppercase tracking-[1.5px] text-[var(--text-h)] m-0">
                Top Repositories
              </h2>
              <button className="flex items-center gap-1 bg-transparent border-none text-[var(--primary)] text-[11px] font-bold cursor-pointer hover:underline">
                View GitHub <ExternalLink size={11} strokeWidth={2} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {REPOS.map(r => (
                <div
                  key={r.name}
                  className={`bg-[var(--bg-hover)] border border-[var(--border)] rounded-[var(--radius-xl)] p-4 cursor-pointer hover:border-[var(--primary-border)] hover:shadow-[var(--shadow-glow)] transition-all duration-[var(--duration-fast)] ${r.wide ? "col-span-2" : "col-span-1"}`}
                >
                  <div className="flex justify-between mb-3">
                    <r.Icon size={22} className="text-[var(--primary)]" strokeWidth={1.6} />
                    <span className="text-[9px] font-bold uppercase tracking-[1px] text-[var(--text-soft)]">Public</span>
                  </div>
                  <div className="text-sm font-extrabold text-[var(--text-h)] mb-1.5">{r.name}</div>
                  <div className="text-xs text-[var(--text)] leading-[1.6] mb-3">{r.desc}</div>
                  <div className="flex gap-3.5 text-[11px] font-mono text-[var(--text)]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: r.langColor }} /> {r.lang}
                    </span>
                    <span className="flex items-center gap-0.5"><Star size={11} strokeWidth={1.8} /> {r.stars}</span>
                    <span className="flex items-center gap-0.5"><GitFork size={11} strokeWidth={1.8} /> {r.forks}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-6">
            <h2 className="text-xs font-extrabold uppercase tracking-[1.5px] text-[var(--text-h)] m-0 mb-6">
              Recent Insights
            </h2>
            <div className="flex flex-col">
              {POSTS.map((p, i) => (
                <article key={p.title} className={`flex gap-4 py-5 relative pl-8 ${i < POSTS.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                  <div className="absolute left-0 top-6 flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 transition-all duration-[var(--duration-fast)] ${p.active ? "bg-[var(--primary)] border-[var(--primary)] shadow-[var(--shadow-glow)]" : "bg-[var(--border)] border-[var(--border)]"}`} />
                    {i < POSTS.length - 1 && (
                      <div className="w-px h-[calc(100%+8px)] bg-[var(--border)] mt-1" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`text-[10px] font-bold uppercase tracking-[1px] mb-1.5 ${p.active ? "text-[var(--primary)]" : "text-[var(--text-muted)]"}`}>
                      {p.date}
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--text-h)] leading-[1.35] m-0 mb-2 cursor-pointer hover:text-[var(--primary)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[var(--text)] leading-[1.65] m-0 mb-3">{p.text}</p>
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--text-soft)]">
                        <MessageSquare size={13} strokeWidth={1.8} /> {p.comments}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--text-soft)]">
                        <Heart size={13} strokeWidth={1.8} /> {p.likes}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-5">
            <div className="flex justify-around">
              {[["4.8k", "Followers"], ["124", "Following"], ["1.4k", "Posts"]].map(([val, lbl]) => (
                <AnimatedStat key={lbl} target={val} label={lbl} />
              ))}
            </div>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-5 text-center">
            <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-4">
              Network Reputation
            </div>
            <div className="relative w-[110px] h-[110px] mx-auto mb-3">
              <svg width="110" height="110" viewBox="0 0 110 110">
                <circle cx="55" cy="55" r="46" fill="none" stroke="var(--bg-hover)" strokeWidth="8"/>
                <circle cx="55" cy="55" r="46" fill="none" stroke="var(--primary)" strokeWidth="8"
                  strokeDasharray="289" strokeDashoffset="29"
                  strokeLinecap="round" transform="rotate(-90 55 55)"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[26px] font-black text-[var(--text-h)]">99</span>
                <span className="text-[9px] font-bold uppercase tracking-[1px] text-[var(--primary)]">Trust</span>
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-soft)] leading-[1.6] m-0">
              Ranked in the top 0.1% of systems architects globally.
            </p>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-3">
              Global Activity
            </div>
            <div className="grid grid-cols-7 gap-[3px]" title="Contributions heatmap">
              {HEATMAP.map((v, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[3px] transition-transform duration-[var(--duration-fast)] hover:scale-150 cursor-pointer"
                  style={{
                    background: v === 0
                      ? "var(--bg-hover)"
                      : `rgba(168,85,247,${v / 100})`,
                  }}
                  title={`${v} contributions`}
                />
              ))}
            </div>
            <p className="text-[10px] text-[var(--text-soft)] font-mono mt-2.5">
              1,402 contributions in the last year
            </p>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[var(--radius-2xl)] p-5">
            <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-[var(--text-muted)] mb-4">
              Stack Proficiency
            </div>
            <div className="space-y-3.5">
              {SKILLS.map(s => (
                <div key={s.label}>
                  <div className="flex justify-between text-[10px] font-mono text-[var(--text)] uppercase mb-1">
                    <span>{s.label}</span>
                    <span>{s.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--bg-hover)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full transition-all duration-[var(--duration-slow)]"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex items-center gap-2 glass-strong rounded-full px-4 py-2 z-50">
        <span className="relative flex w-2 h-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--online)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--online)]" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[var(--text-h)]">
          Node Status: Active
        </span>
      </div>
    </div>
  )
}

"use client"

import React, { useState } from "react"
import {
  Terminal, Zap, Layers, Cloud, Plus,
  MessageSquare, Share2, ArrowUpRight, Users,
} from "lucide-react"

const FILTERS = ["All Communities", "Rust", "Web3", "TypeScript", "Cloud"]

const TRENDING = [
  {
    id: 1, name: "Web3 Builders", badge: "Fastest Growing", featured: true,
    desc: "Engineering the decentralized future with Ethereum, Solana, and Rust-based smart contracts.",
    members: "12.4k", Icon: null,
    color: "var(--accent)", bg: "var(--accent-bg)",
  },
  {
    id: 2, name: "Rustaceans", members: "8.1k", online: "242",
    Icon: Terminal, color: "var(--accent)", bg: "var(--bg-hover)", featured: false, badge: "", desc: "",
  },
  {
    id: 3, name: "Next.js Experts", members: "15.2k", online: "1.1k",
    Icon: Zap, color: "var(--tertiary)", bg: "var(--bg-hover)", featured: false, badge: "", desc: "",
  },
]

const MY_GROUPS = [
  { name: "Go Microservices", role: "Architects",    Icon: Terminal, members: "4.2k", count: "+12" },
  { name: "Typescript Pro",   role: "Language Hub",  Icon: Layers,   members: "21k",  count: "+55" },
  { name: "K8s Masters",      role: "Cloud Native",  Icon: Cloud,    members: "3.8k", count: "+9"  },
]

const DISCUSSIONS = [
  {
    community: "Rustaceans", communityColor: "var(--accent)",
    author: "@oxide_dev", time: "4h ago",
    title: "Deep Dive into Memory Management in v1.75: What you need to know",
    text: "The latest release brings significant improvements to how we handle concurrent memory allocations. I've been testing the new allocator on our production workloads and the results are... interesting.",
    comments: 128, shares: 42,
  },
  {
    community: "Next.js Experts", communityColor: "var(--tertiary)",
    author: "@frontend_queen", time: "8h ago",
    title: "Is Server Actions the final nail in the coffin for client-side API libraries?",
    text: "With the stabilization of Server Actions, the boundary between client and server is blurring more than ever. Does anyone still find a need for React Query in small to mid-sized apps?",
    comments: 312, shares: 15,
  },
]

const CONTRIBUTORS = [
  { initials: "SC", name: "@sarah_codes", role: "Rust Expert",  points: "+2.4k", color: "#c49aff", bg: "rgba(196,154,255,.15)" },
  { initials: "DG", name: "@dev_guru",    role: "Web3 Guru",    points: "+1.8k", color: "#ff94a8", bg: "rgba(255,148,168,.15)" },
  { initials: "VS", name: "@v_scale",     role: "Architect",    points: "+1.1k", color: "#60a5fa", bg: "rgba(96,165,250,.12)"  },
]

const S = {
  page:      { padding: "24px", maxWidth: 720, margin: "0 auto" } as React.CSSProperties,
  hero:      { marginBottom: 32 } as React.CSSProperties,
  h1:        { fontSize: 44, fontWeight: 900, letterSpacing: "-2px", color: "var(--text-h)", lineHeight: 1.1, margin: "0 0 12px" } as React.CSSProperties,
  h1span:    { color: "var(--accent)", fontStyle: "italic" } as React.CSSProperties,
  sub:       { fontSize: 14, color: "var(--text)", lineHeight: 1.7, maxWidth: 440, margin: 0 } as React.CSSProperties,
  pulse:     { display: "flex", alignItems: "center", gap: 8, marginBottom: 24 } as React.CSSProperties,
  dot:       (color: string) => ({ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }) as React.CSSProperties,
  sectionLabel: { fontSize: 10, fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: "2px", color: "var(--text)" },
  sectionRow:{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 } as React.CSSProperties,
  section:   { marginBottom: 48 } as React.CSSProperties,
  card:      { background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px", marginBottom: 12, cursor: "pointer", transition: "border-color .15s" } as React.CSSProperties,
  row:       { display: "flex", alignItems: "center", justifyContent: "space-between" } as React.CSSProperties,
  iconBox:   (color: string, bg: string) => ({ width: 48, height: 48, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color }) as React.CSSProperties,
}

export default function Comunidades() {
  const [activeFilter, setActiveFilter] = useState("All Communities")
  const [joined, setJoined] = useState<Record<string, boolean>>({})

  return (
    <div style={S.page}>

      {/* Hero */}
      <section style={S.hero}>
        <h1 style={S.h1}>
          Find your <br /><span style={S.h1span}>collective.</span>
        </h1>
        <p style={S.sub}>
          Connect with developers building the future. Join specialized hubs of expertise, from systems programming to high-end UI engineering.
        </p>
      </section>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 32, scrollbarWidth: "none" }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              flexShrink: 0, padding: "8px 20px", borderRadius: 99, fontSize: 12, fontWeight: 700,
              cursor: "pointer", border: "1px solid",
              background:   activeFilter === f ? "var(--accent)"    : "var(--bg-surface)",
              color:        activeFilter === f ? "#1a0033"          : "var(--text)",
              borderColor:  activeFilter === f ? "var(--accent)"    : "var(--border)",
              transition: "all .15s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Trending */}
      <section style={S.section}>
        <div style={S.sectionRow}>
          <div style={S.pulse}>
            <div style={S.dot("var(--tertiary)")} />
            <span style={S.sectionLabel}>Trending</span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1, cursor: "pointer" }}>
            Ver todo
          </span>
        </div>

        {TRENDING.map((c) =>
          c.featured ? (
            // Featured card
            <div key={c.id} style={{ ...S.card, marginBottom: 12, position: "relative" }}>
              <span style={{ background: "var(--bg-hover)", color: "var(--accent)", border: "1px solid var(--accent-border)", fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, padding: "3px 10px", borderRadius: 99, display: "inline-block", marginBottom: 16 }}>
                {c.badge}
              </span>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-1.5px", color: "var(--text-h)", marginBottom: 10 }}>{c.name}</div>
              <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7, marginBottom: 20, maxWidth: 400 }}>{c.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "var(--text-h)" }}>
                  <Users size={15} style={{ color: "var(--accent)" }} strokeWidth={2} />
                  {c.members} Members
                </div>
                <button
                  onClick={() => setJoined((p) => ({ ...p, [c.name]: !p[c.name] }))}
                  style={{ background: joined[c.name] ? "transparent" : "var(--accent)", color: joined[c.name] ? "var(--accent)" : "#1a0033", border: "1px solid var(--accent)", borderRadius: 10, padding: "10px 28px", fontSize: 12, fontWeight: 800, cursor: "pointer", transition: "all .15s" }}
                >
                  {joined[c.name] ? "Joined ✓" : "Join Collective"}
                </button>
              </div>
            </div>
          ) : (
            // Regular card
            <div key={c.id} style={{ ...S.card, ...S.row }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={S.iconBox(c.color, c.bg)}>
                  {c.Icon && <c.Icon size={20} strokeWidth={1.8} />}
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px", color: "var(--text-h)", marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text)" }}>
                    {c.members} members <span style={{ opacity: .4 }}>•</span> {c.online} online
                  </div>
                </div>
              </div>
              <ArrowUpRight size={18} style={{ color: "var(--text)", flexShrink: 0 }} strokeWidth={1.8} />
            </div>
          )
        )}
      </section>

      {/* Mis grupos */}
      <section style={S.section}>
        <div style={S.pulse}>
          <div style={S.dot("var(--accent)")} />
          <span style={S.sectionLabel}>Mis grupos</span>
        </div>

        {MY_GROUPS.map(({ name, role, Icon, members, count }) => (
          <div key={name} style={{ ...S.card, ...S.row }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={S.iconBox("var(--accent)", "var(--bg-hover)")}>
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-h)", marginBottom: 2 }}>{name}</div>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: "var(--text)" }}>{role}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text)", marginBottom: 2 }}>{count} más</div>
              <div style={{ fontSize: 11, color: "var(--text)", opacity: .6 }}>{members} mems</div>
            </div>
          </div>
        ))}

        {/* Crear colectivo */}
        <div style={{ ...S.card, border: "2px dashed var(--border)", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--bg-hover)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={18} style={{ color: "var(--text)" }} strokeWidth={2} />
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--text)" }}>
            Crear colectivo
          </span>
        </div>
      </section>

      {/* Discusiones globales */}
      <section style={S.section}>
        <div style={S.pulse}>
          <div style={S.dot("#d896ff")} />
          <span style={S.sectionLabel}>Discusiones globales</span>
        </div>

        {DISCUSSIONS.map((d) => (
          <div key={d.title} style={{ ...S.card, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, flexWrap: "wrap" }}>
              <span style={{ color: d.communityColor }}>{d.community}</span>
              <span style={{ opacity: .3, color: "var(--text)" }}>•</span>
              <span style={{ color: "var(--text)" }}>Posted by <span style={{ color: "var(--text-h)" }}>{d.author}</span></span>
              <span style={{ opacity: .3, color: "var(--text)" }}>•</span>
              <span style={{ color: "var(--text)", opacity: .6 }}>{d.time}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.5px", color: "var(--text-h)", lineHeight: 1.3, cursor: "pointer" }}>
              {d.title}
            </div>
            <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7, margin: 0 }}>{d.text}</p>
            <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--text)", padding: 0 }}>
                <MessageSquare size={15} strokeWidth={1.8} /> {d.comments}
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--text)", padding: 0 }}>
                <Share2 size={15} strokeWidth={1.8} /> {d.shares}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Top contributors */}
      <section style={S.section}>
        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "var(--accent)", marginBottom: 20 }}>
          Top Contributors
        </div>
        {CONTRIBUTORS.map((c) => (
          <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                {c.initials}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text-h)" }}>{c.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text)" }}>{c.role}</div>
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: "var(--accent)" }}>{c.points}</span>
          </div>
        ))}
      </section>

      {/* CTA Premium */}
      <section style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, marginBottom: 48 }}>
        <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.5px", color: "var(--text-h)", marginBottom: 8 }}>Build Together.</div>
        <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.7, marginBottom: 20 }}>
          Upgrade to Sanctum Pro for private collectives and unlimited repository integrations.
        </p>
        <button style={{ width: "100%", background: "var(--text-h)", color: "var(--bg)", border: "none", borderRadius: 10, padding: "14px", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2, cursor: "pointer" }}>
          Go Premium
        </button>
      </section>

    </div>
  )
}
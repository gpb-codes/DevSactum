"use client"

import React, { useState } from "react"
import {
  Star, Award, TrendingUp, Users, Shield, Heart, MessageSquare,
  Code2, GitFork, CheckCircle, Flame, Crown, Zap, Target,
  Rocket, GraduationCap, Bug, Search, PenTool, Mic, Crown as CrownIcon,
} from "lucide-react"
import { useJobAuth } from "@/context/JobAuthContext"

const BADGES = [
  { id: "b1", name: "Early Adopter", icon: Rocket, desc: "Únete en los primeros 1000 usuarios", earned: true, color: "#a855f7" },
  { id: "b2", name: "Open Source Hero", icon: Star, desc: "10+ contribuciones mergeadas", earned: true, color: "#f59e0b" },
  { id: "b3", name: "Mentor", icon: GraduationCap, desc: "Ayuda a 5+ developers junior", earned: true, color: "#4ade80" },
  { id: "b4", name: "Bug Hunter", icon: Bug, desc: "Reporta 10+ bugs en proyectos open source", earned: true, color: "#f87171" },
  { id: "b5", name: "Code Reviewer", icon: Search, desc: "100+ reviews de código completadas", earned: false, color: "#60a5fa" },
  { id: "b6", name: "Tech Writer", icon: PenTool, desc: "Publica 10+ artículos técnicos", earned: false, color: "#fb923c" },
  { id: "b7", name: "Conference Speaker", icon: Mic, desc: "Habla en 3+ conferencias", earned: false, color: "#f472b6" },
  { id: "b8", name: "Top Contributor", icon: CrownIcon, desc: "Top 1% de contributors global", earned: false, color: "#facc15" },
]

const LEADERBOARD = [
  { rank: 1, name: "Sarah Chen", handle: "@sarah_codes", score: 9850, level: "Architect", initials: "SC", color: "#c49aff", bg: "rgba(196,154,255,.15)", streak: 45 },
  { rank: 2, name: "Soren K.", handle: "@soren_kernel", score: 9420, level: "Architect", initials: "SK", color: "#60a5fa", bg: "rgba(96,165,250,.12)", streak: 32 },
  { rank: 3, name: "Alex Volkov", handle: "@alex_volkov", score: 9100, level: "Senior", initials: "AV", color: "#4ade80", bg: "rgba(74,222,128,.12)", streak: 28 },
  { rank: 4, name: "María R.", handle: "@maria_oss", score: 8750, level: "Senior", initials: "MR", color: "#ff94a8", bg: "rgba(255,148,168,.15)", streak: 21 },
  { rank: 5, name: "Dev Guru", handle: "@dev_guru", score: 8200, level: "Senior", initials: "DG", color: "#f59e0b", bg: "rgba(245,158,11,.12)", streak: 18 },
]

const ENDORSEMENTS = [
  { from: "Sarah Chen", skill: "Rust", date: "Hace 2d", text: "Excellent systems programming skills" },
  { from: "Soren K.", skill: "Distributed Systems", date: "Hace 5d", text: "Deep understanding of consensus protocols" },
  { from: "María R.", skill: "Code Review", date: "Hace 1sem", text: "Thorough and constructive feedback" },
  { from: "Dev Guru", skill: "Performance Optimization", date: "Hace 2sem", text: "Optimized our pipeline by 40%" },
]

function TrustScoreRing() {
  return (
    <div className="bg-bg-surface border border-border rounded-[14px] p-6 text-center">
      <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-text opacity-60 mb-4">Trust Score</div>
      <div className="relative w-[140px] h-[140px] mx-auto mb-4">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="58" fill="none" stroke="var(--color-bg-hover)" strokeWidth="10"/>
          <circle cx="70" cy="70" r="58" fill="none" stroke="var(--color-accent)" strokeWidth="10"
            strokeDasharray={2 * Math.PI * 58}
            strokeDashoffset={2 * Math.PI * 58 * (1 - 0.92)}
            strokeLinecap="round" transform="rotate(-90 70 70)"/>
          <circle cx="70" cy="70" r="46" fill="none" stroke="var(--color-bg-hover)" strokeWidth="6"/>
          <circle cx="70" cy="70" r="46" fill="none" stroke="var(--color-success)" strokeWidth="6"
            strokeDasharray={2 * Math.PI * 46}
            strokeDashoffset={2 * Math.PI * 46 * (1 - 0.88)}
            strokeLinecap="round" transform="rotate(-90 70 70)"/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[36px] font-black text-text-h">92</span>
          <span className="text-[10px] font-bold uppercase tracking-[1px] text-accent">Trust</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-bg-hover rounded-[8px] p-2">
          <div className="text-[14px] font-black text-text-h">45</div>
          <div className="text-[8px] font-bold uppercase tracking-[1px] text-text opacity-60">Endorsements</div>
        </div>
        <div className="bg-bg-hover rounded-[8px] p-2">
          <div className="text-[14px] font-black text-text-h">28d</div>
          <div className="text-[8px] font-bold uppercase tracking-[1px] text-text opacity-60">Streak</div>
        </div>
      </div>
    </div>
  )
}

export default function ReputationPage() {
  const { user } = useJobAuth()
  const [activeTab, setActiveTab] = useState<"badges" | "leaderboard" | "endorsements">("badges")

  return (
    <div className="px-6 py-6 max-w-[900px] mx-auto">
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Award size={16} className="text-accent" strokeWidth={2} />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-text opacity-60">Reputación Técnica</span>
        </div>
        <h1 className="text-[32px] font-black tracking-[-1.5px] text-text-h leading-[1.1] mb-2">
          Tu <span className="gradient-text italic">reputación</span> técnica
        </h1>
        <p className="text-[13px] text-text leading-[1.7] max-w-[500px] opacity-80">
          Badges, trust score, endorsements y leaderboard. Demuestra tu expertise con datos reales.
        </p>
      </section>

      <div className="grid grid-cols-[1fr_300px] gap-5 mb-6">
        <div>
          <div className="flex gap-1 border-b border-border mb-5">
            {([
              { key: "badges" as const, label: "Badges", icon: Award },
              { key: "leaderboard" as const, label: "Leaderboard", icon: TrendingUp },
              { key: "endorsements" as const, label: "Endorsements", icon: MessageSquare },
            ]).map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-3 py-2 text-[11px] cursor-pointer border-none bg-transparent border-b-2 -mb-px transition-colors ${
                  activeTab === key ? "border-accent text-accent font-bold" : "border-transparent text-text font-medium hover:text-text-h"
                }`}>
                <Icon size={12} strokeWidth={2} /> {label}
              </button>
            ))}
          </div>

          {activeTab === "badges" && (
            <div className="grid grid-cols-2 gap-3 animate-fade-in">
              {BADGES.map(b => (
                <div key={b.id} className={`bg-bg-surface border rounded-[12px] p-4 transition-all ${
                  b.earned ? "border-accent-border hover:shadow-glow" : "border-border opacity-60"
                }`}>
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-2"
                    style={{ background: `${b.color}18`, color: b.color }}>
                    <b.icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[12px] font-extrabold text-text-h m-0 mb-1">{b.name}</h3>
                  <p className="text-[10px] text-text m-0 opacity-70 leading-[1.5]">{b.desc}</p>
                  {b.earned && (
                    <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-success">
                      <CheckCircle size={9} strokeWidth={2.5} /> Obtenido
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="flex flex-col animate-fade-in">
              {LEADERBOARD.map((entry, idx) => (
                <div key={entry.rank} className={`flex items-center gap-4 py-4 ${idx < LEADERBOARD.length - 1 ? "border-b border-border" : ""}`}>
                  <span className={`text-[18px] font-black w-8 text-center ${
                    entry.rank === 1 ? "text-[#facc15]" : entry.rank === 2 ? "text-[#94a3b8]" : entry.rank === 3 ? "text-[#fb923c]" : "text-text opacity-40"
                  }`}>
                    {entry.rank}
                  </span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: entry.bg, color: entry.color }}>
                    {entry.initials}
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-text-h">{entry.name}</div>
                    <div className="text-[10px] text-text opacity-60">{entry.handle} • {entry.level}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-black text-text-h">{entry.score.toLocaleString()}</div>
                    <div className="flex items-center gap-1 text-[9px] text-accent justify-end">
                      <Flame size={9} strokeWidth={2.5} /> {entry.streak}d streak
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "endorsements" && (
            <div className="flex flex-col gap-3 animate-fade-in">
              {ENDORSEMENTS.map((e, i) => (
                <div key={i} className="bg-bg-surface border border-border rounded-[12px] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-bold text-text-h">{e.from}</span>
                    <span className="text-[10px] text-text opacity-50">{e.date}</span>
                  </div>
                  <span className="bg-accent-bg text-accent border border-accent-border text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mb-2">{e.skill}</span>
                  <p className="text-[11px] text-text leading-[1.6] m-0 opacity-80">&ldquo;{e.text}&rdquo;</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky top-20">
          <TrustScoreRing />
        </div>
      </div>
    </div>
  )
}

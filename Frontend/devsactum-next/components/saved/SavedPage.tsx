"use client"

import React, { useState } from "react"
import { Bookmark, BookOpen, Code2, Users, Trash2, Search, Filter } from "lucide-react"
import { EmptyState } from "@/components/ui/EmptyState"
import { useToast } from "@/components/ui/Toast"

type SavedItem = {
  id: number
  type: "post" | "article" | "repo" | "community"
  title: string
  author: string
  authorHandle: string
  preview: string
  savedAt: string
  tags?: string[]
  avatarColor: string
  avatarBg: string
  initials: string
}

const TYPE_ICONS = {
  post:      { Icon: BookOpen, label: "Post",        color: "text-accent",    bg: "bg-accent-bg"    },
  article:   { Icon: BookOpen, label: "Artículo",    color: "text-tertiary",  bg: "bg-tertiary-bg"  },
  repo:      { Icon: Code2,    label: "Repositorio", color: "text-[#60a5fa]", bg: "bg-[rgba(96,165,250,.12)]" },
  community: { Icon: Users,    label: "Comunidad",   color: "text-[#4ade80]", bg: "bg-[rgba(74,222,128,.12)]" },
}

const MOCK_SAVED: SavedItem[] = [
  {
    id: 1, type: "post", title: "Optimizando el hydration loop para el nuevo reactive engine",
    author: "James Dalton", authorHandle: "@jdalton_dev",
    preview: "Reducimos TTI un 40% usando un custom worker-thread scheduler con Web Workers y requestIdleCallback.",
    savedAt: "Hace 2h", tags: ["Performance", "React", "Workers"],
    avatarColor: "#c49aff", avatarBg: "rgba(196,154,255,.15)", initials: "JD",
  },
  {
    id: 2, type: "article", title: "El futuro de la infraestructura descentralizada",
    author: "Soren K.", authorHandle: "@soren_kernel",
    preview: "Un análisis profundo de cómo los sistemas distribuidos modernos están reemplazando los monolitos tradicionales.",
    savedAt: "Hace 5h", tags: ["Web3", "Infrastructure", "Distributed Systems"],
    avatarColor: "#60a5fa", avatarBg: "rgba(96,165,250,.12)", initials: "SK",
  },
  {
    id: 3, type: "repo", title: "lumina-engine",
    author: "Alex Volkov", authorHandle: "@alex_volkov",
    preview: "High-performance async runtime for WebAssembly modules in edge environments. 12.4k ⭐",
    savedAt: "Hace 1d", tags: ["Rust", "WebAssembly", "Edge"],
    avatarColor: "#ff94a8", avatarBg: "rgba(255,148,168,.15)", initials: "AV",
  },
  {
    id: 4, type: "community", title: "Rustaceans",
    author: "Comunidad", authorHandle: "8.1k miembros",
    preview: "La comunidad más grande de programadores Rust. Discusiones sobre sistemas, performance y seguridad.",
    savedAt: "Hace 3d", tags: ["Rust", "Systems"],
    avatarColor: "#f59e0b", avatarBg: "rgba(245,158,11,.12)", initials: "RS",
  },
]

export default function SavedPage() {
  const { success } = useToast()
  const [items, setItems] = useState(MOCK_SAVED)
  const [filter, setFilter] = useState<"all" | SavedItem["type"]>("all")
  const [search, setSearch] = useState("")

  const filtered = items.filter(item =>
    (filter === "all" || item.type === filter) &&
    (!search || item.title.toLowerCase().includes(search.toLowerCase()) ||
     item.author.toLowerCase().includes(search.toLowerCase()))
  )

  function removeItem(id: number) {
    setItems(prev => prev.filter(i => i.id !== id))
    success("Eliminado de guardados")
  }

  const FILTERS = [
    { id: "all",       label: "Todo",          count: items.length },
    { id: "post",      label: "Posts",         count: items.filter(i => i.type === "post").length },
    { id: "article",   label: "Artículos",     count: items.filter(i => i.type === "article").length },
    { id: "repo",      label: "Repositorios",  count: items.filter(i => i.type === "repo").length },
    { id: "community", label: "Comunidades",   count: items.filter(i => i.type === "community").length },
  ]

  return (
    <div className="px-6 py-6 max-w-[760px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-9 h-9 rounded-[9px] bg-accent-bg border border-accent-border flex items-center justify-center">
          <Bookmark size={16} className="text-accent" strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-[22px] font-black tracking-[-0.5px] text-text-h m-0">Guardados</h1>
          <p className="text-[11px] text-text m-0 opacity-60">{items.length} ítems guardados</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-lg px-3 py-2.5 mb-5">
        <Search size={13} className="text-text opacity-50 shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar en guardados..."
          className="bg-transparent border-none outline-none text-[12px] text-text-h w-full"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold cursor-pointer border transition-all duration-150 ${
              filter === f.id
                ? "bg-accent text-[#1a0033] border-accent"
                : "bg-bg-surface text-text border-border hover:border-accent-border"
            }`}
          >
            {f.label}
            <span className={`text-[9px] font-black px-1 rounded-full ${filter === f.id ? "bg-[rgba(0,0,0,0.2)] text-[#1a0033]" : "bg-bg-hover text-text"}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Items */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={24} className="opacity-40 text-text" strokeWidth={1.5} />}
          title="Sin guardados"
          description={search ? "No se encontraron resultados para tu búsqueda" : "Guarda posts, artículos y repositorios para verlos después"}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item, idx) => {
            const { Icon, label, color, bg } = TYPE_ICONS[item.type]
            return (
              <div
                key={item.id}
                className="bg-bg-surface border border-border rounded-[14px] p-5 hover:border-accent-border transition-all duration-200 animate-fade-in group"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Type badge */}
                  <div className={`w-10 h-10 rounded-[9px] ${bg} flex items-center justify-center shrink-0 ${color}`}>
                    <Icon size={16} strokeWidth={1.8} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <span className={`text-[9px] font-bold uppercase tracking-[1px] ${color} mr-2`}>{label}</span>
                        <span className="text-[10px] text-text opacity-40">{item.savedAt}</span>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 bg-transparent border-none cursor-pointer text-text hover:text-tertiary transition-all p-1 shrink-0"
                      >
                        <Trash2 size={13} strokeWidth={1.8} />
                      </button>
                    </div>

                    <h3 className="text-[14px] font-extrabold text-text-h m-0 mb-1.5 cursor-pointer hover:text-accent transition-colors leading-[1.3]">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-text leading-[1.6] m-0 mb-3 opacity-80 line-clamp-2">
                      {item.preview}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0"
                          style={{ background: item.avatarBg, color: item.avatarColor }}
                        >
                          {item.initials}
                        </div>
                        <span className="text-[11px] text-text">{item.author}</span>
                        <span className="text-[10px] text-text opacity-40">{item.authorHandle}</span>
                      </div>
                      {item.tags && (
                        <div className="flex gap-1">
                          {item.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="bg-bg-hover text-text text-[9px] font-bold px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
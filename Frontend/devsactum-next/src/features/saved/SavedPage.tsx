"use client"

import React, { useState } from "react"
import { Bookmark, BookOpen, Code2, Users, Trash2, Search } from "lucide-react"
import { EmptyState } from "@/src/components/ui/EmptyState"
import { useToast } from "@/src/components/ui/Toast"
import { Badge } from "@/src/components/ui/Badge"

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
  post:      { Icon: BookOpen, label: "Post",        color: "var(--primary)",    bg: "var(--primary-soft)" },
  article:   { Icon: BookOpen, label: "Artículo",    color: "var(--accent)",     bg: "var(--accent-soft)" },
  repo:      { Icon: Code2,    label: "Repositorio", color: "var(--secondary)",  bg: "var(--secondary-soft)" },
  community: { Icon: Users,    label: "Comunidad",   color: "#4ade80",           bg: "rgba(74,222,128,.12)" },
}

const MOCK_SAVED: SavedItem[] = [
  { id: 1, type: "post", title: "Optimizando el hydration loop para el nuevo reactive engine", author: "James Dalton", authorHandle: "@jdalton_dev", preview: "Reducimos TTI un 40% usando un custom worker-thread scheduler con Web Workers y requestIdleCallback.", savedAt: "Hace 2h", tags: ["Performance", "React", "Workers"], avatarColor: "var(--primary)", avatarBg: "var(--primary-soft)", initials: "JD" },
  { id: 2, type: "article", title: "El futuro de la infraestructura descentralizada", author: "Soren K.", authorHandle: "@soren_kernel", preview: "Un análisis profundo de cómo los sistemas distribuidos modernos están reemplazando los monolitos tradicionales.", savedAt: "Hace 5h", tags: ["Web3", "Infrastructure"], avatarColor: "var(--secondary)", avatarBg: "var(--secondary-soft)", initials: "SK" },
  { id: 3, type: "repo", title: "lumina-engine", author: "Alex Volkov", authorHandle: "@alex_volkov", preview: "High-performance async runtime for WebAssembly modules in edge environments. 12.4k ⭐", savedAt: "Hace 1d", tags: ["Rust", "WebAssembly"], avatarColor: "var(--accent)", avatarBg: "var(--accent-soft)", initials: "AV" },
  { id: 4, type: "community", title: "Rustaceans", author: "Comunidad", authorHandle: "8.1k miembros", preview: "La comunidad más grande de programadores Rust. Discusiones sobre sistemas, performance y seguridad.", savedAt: "Hace 3d", tags: ["Rust", "Systems"], avatarColor: "#fb923c", avatarBg: "rgba(251,146,60,.12)", initials: "RS" },
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

  const FILTERS = [
    { id: "all",       label: "Todo",        count: items.length },
    { id: "post",      label: "Posts",       count: items.filter(i => i.type === "post").length },
    { id: "article",   label: "Artículos",   count: items.filter(i => i.type === "article").length },
    { id: "repo",      label: "Repositorios", count: items.filter(i => i.type === "repo").length },
    { id: "community", label: "Comunidades",  count: items.filter(i => i.type === "community").length },
  ]

  return (
    <div className="px-6 py-6 max-w-[760px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--primary-soft)] border border-[var(--primary-border)] flex items-center justify-center">
          <Bookmark size={16} className="text-[var(--primary)]" strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-[-0.5px] text-[var(--text-h)] m-0">Guardados</h1>
          <p className="text-xs text-[var(--text-soft)] m-0">{items.length} ítems guardados</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-[var(--bg-surface)] border-2 border-[var(--border)] rounded-[var(--radius-lg)] px-3 py-2.5 mb-5 focus-within:border-[var(--border-active)] focus-within:shadow-[var(--shadow-glow)] transition-all">
        <Search size={13} className="text-[var(--text-muted)] shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar en guardados..."
          className="bg-transparent border-none outline-none text-xs text-[var(--text-h)] w-full"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as "all" | SavedItem["type"])}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer border-2 transition-all duration-[var(--duration-fast)] ${
              filter === f.id
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "bg-[var(--bg-surface)] text-[var(--text-soft)] border-[var(--border)] hover:border-[var(--primary-border)] hover:text-[var(--primary)]"
            }`}
          >
            {f.label}
            <span className={`text-[9px] font-black px-1.5 rounded-full ${filter === f.id ? "bg-white/20 text-white" : "bg-[var(--bg-hover)] text-[var(--text-soft)]"}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Items */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={24} className="opacity-40" strokeWidth={1.5} />}
          title="Sin guardados"
          description={search ? "No se encontraron resultados para tu búsqueda" : "Guarda posts, artículos y repositorios para verlos después"}
        />
      ) : (
        <div className="space-y-3 animate-stagger">
          {filtered.map((item, idx) => {
            const { Icon, label, color, bg } = TYPE_ICONS[item.type]
            return (
              <div
                key={item.id}
                className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-5 hover:border-[var(--primary-border)] hover:shadow-[var(--shadow-glow)] transition-all duration-[var(--duration-fast)] group animate-fade-in"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-[var(--radius-lg)] ${bg} flex items-center justify-center shrink-0`} style={{ color }}>
                    <Icon size={16} strokeWidth={1.8} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-[1px] mr-2" style={{ color }}>{label}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{item.savedAt}</span>
                      </div>
                      <button
                        onClick={() => { setItems(prev => prev.filter(i => i.id !== item.id)); success("Eliminado de guardados") }}
                        className="opacity-0 group-hover:opacity-100 bg-transparent border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--danger)] transition-all p-1 shrink-0"
                      >
                        <Trash2 size={13} strokeWidth={1.8} />
                      </button>
                    </div>

                    <h3 className="text-sm font-extrabold text-[var(--text-h)] m-0 mb-1.5 cursor-pointer hover:text-[var(--primary)] transition-colors leading-[1.3]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text)] leading-[1.6] m-0 mb-3 opacity-80 line-clamp-2">
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
                        <span className="text-xs text-[var(--text)]">{item.author}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{item.authorHandle}</span>
                      </div>
                      {item.tags && (
                        <div className="flex gap-1">
                          {item.tags.slice(0, 2).map(tag => (
                            <Badge key={tag}>{tag}</Badge>
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

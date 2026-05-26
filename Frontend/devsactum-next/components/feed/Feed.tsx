"use client"

import React, { useState } from "react"
import {
  Heart, MessageSquare, Share2, MoreHorizontal, Repeat2, Plus,
  Image, Code2, Link, Send, Smile, BookOpen, X,
} from "lucide-react"
import { useToast } from "@/components/ui/Toast"

const POSTS = [
  {
    id: 1, initials: "JD", name: "James Dalton", handle: "@jdalton_dev", time: "2h",
    text: "Optimizando el loop de hidratación para el nuevo reactive engine. Reducimos TTI un 40% usando un custom worker-thread scheduler. Miren la implementación core:",
    code: `async function hydrate(root: Node) {\n  // Offload expensive diffing to Worker\n  const patch = await worker.computeDiff(root);\n\n  requestIdleCallback(() => {\n    applyPatch(root, patch);\n  });\n}`,
    codeFile: "scheduler.ts",
    likes: 1200, comments: 84, shares: 12, liked: false,
    avatarColor: "#c49aff", avatarBg: "rgba(196,154,255,.15)",
  },
  {
    id: 2, initials: "ER", name: "Elena Rivera", handle: "@elena_codes", time: "5h",
    text: "Terminé la UI hardware-acelerada para el nuevo emulador de terminal. El tonal layering y los luminescent pulses se sienten mucho mejor que los bordes estándar. 🎨",
    tags: ["Design System", "Rust", "WGPU"],
    likes: 452, comments: 29, shares: 8, liked: true,
    avatarColor: "#ff94a8", avatarBg: "rgba(255,148,168,.15)",
  },
  {
    id: 3, initials: "SK", name: "Soren K.", handle: "@soren_kernel", time: "8h",
    text: "",
    milestone: {
      quote: "Shipped v2.0 of the decentralized storage layer. 0% downtime during migration.",
      stat: "142k", statLabel: "requests/s", statCaption: "Peak Throughput",
    },
    likes: 891, comments: 114, shares: 0, liked: false,
    avatarColor: "#60a5fa", avatarBg: "rgba(96,165,250,.12)",
  },
  {
    id: 4, initials: "MR", name: "María R.", handle: "@maria_oss", time: "12h",
    text: "Finalmente entendí el ownership model de Rust después de 6 meses. El click que te da cuando todo hace sentido es increíble. Si están aprendiendo Rust, el libro de Jon Gjengset es OBLIGATORIO. No hay atajos en este lenguaje y eso es exactamente lo que lo hace hermoso.",
    tags: ["Rust", "Learning"],
    likes: 234, comments: 67, shares: 19, liked: false,
    avatarColor: "#4ade80", avatarBg: "rgba(74,222,128,.12)",
  },
  {
    id: 5, initials: "TS", name: "Tom Simons", handle: "@tsimons_dev", time: "1d",
    text: "Hot take: La mayoría de microservicios deberían ser monolitos bien estructurados. La complejidad operacional de K8s + service mesh + distributed tracing no vale la pena para el 90% de los productos. Comiencen simple, escalen cuando el problema sea real.",
    likes: 1876, comments: 312, shares: 88, liked: false,
    avatarColor: "#f59e0b", avatarBg: "rgba(245,158,11,.12)",
  },
]

function Composer({ onPost }: { onPost: (text: string) => void }) {
  const [text, setText] = useState("")
  const [focused, setFocused] = useState(false)

  function submit() {
    if (!text.trim()) return
    onPost(text.trim())
    setText("")
    setFocused(false)
  }

  return (
    <div className={`mx-6 mt-5 mb-2 border rounded-[14px] transition-all duration-200 ${focused ? "border-accent-border bg-bg-surface" : "border-border bg-bg-surface"}`}>
      <div className="flex gap-3 p-4">
        <div className="w-9 h-9 rounded-full bg-accent-bg border border-accent-border flex items-center justify-center text-[12px] font-bold text-accent shrink-0">
          AV
        </div>
        <div className="flex-1 min-w-0">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="¿Qué estás construyendo hoy?"
            rows={focused ? 3 : 1}
            className="w-full bg-transparent border-none outline-none text-[13px] text-text-h resize-none placeholder:text-text placeholder:opacity-40 leading-[1.6]"
          />
        </div>
      </div>
      {focused && (
        <div className="flex items-center justify-between px-4 pb-3 border-t border-border pt-3 animate-fade-in">
          <div className="flex gap-1">
            {[
              { Icon: Image,   title: "Imagen" },
              { Icon: Code2,   title: "Código" },
              { Icon: Link,    title: "Link" },
              { Icon: Smile,   title: "Emoji" },
            ].map(({ Icon, title }) => (
              <button key={title} title={title}
                className="p-1.5 rounded-lg text-text bg-transparent border-none cursor-pointer hover:bg-bg-hover hover:text-text-h transition-colors">
                <Icon size={14} strokeWidth={1.8} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono ${text.length > 280 ? "text-tertiary" : "text-text opacity-40"}`}>
              {text.length}/300
            </span>
            <button
              onClick={submit}
              disabled={!text.trim()}
              className="flex items-center gap-1.5 bg-accent text-[#1a0033] border-none rounded-[8px] px-3.5 py-1.5 text-[12px] font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-85 transition-opacity"
            >
              <Send size={12} strokeWidth={2.5} /> Publicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Feed() {
  const { success } = useToast()
  const [posts, setPosts]   = useState(POSTS)
  const [likes, setLikes]   = useState<Record<number, { count: number; liked: boolean }>>(
    Object.fromEntries(POSTS.map(p => [p.id, { count: p.likes, liked: p.liked }]))
  )
  const [commenting, setCommenting] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")

  function toggleLike(id: number) {
    setLikes(prev => ({
      ...prev,
      [id]: { count: prev[id].liked ? prev[id].count - 1 : prev[id].count + 1, liked: !prev[id].liked },
    }))
  }

  function handleNewPost(text: string) {
    const newPost = {
      id: Date.now(),
      initials: "AV", name: "Alex Volkov", handle: "@alex_volkov", time: "ahora",
      text, likes: 0, comments: 0, shares: 0, liked: false,
      avatarColor: "#c49aff", avatarBg: "rgba(196,154,255,.15)",
    }
    setPosts(prev => [newPost as any, ...prev])
    setLikes(prev => ({ ...prev, [newPost.id]: { count: 0, liked: false } }))
    success("Post publicado", "Tu post es visible en el feed")
  }

  function handleShare(id: number) {
    success("Enlace copiado", "El enlace del post fue copiado al portapapeles")
  }

  function fmt(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n)
  }

  return (
    <div className="relative pb-20">
      {/* Live indicator */}
      <div className="flex items-center gap-2 px-6 pt-5">
        <div className="w-1.5 h-1.5 rounded-full bg-online animate-pulse-slow shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-text opacity-60">
          Actividad en vivo · 124 devs activos
        </span>
      </div>

      <Composer onPost={handleNewPost} />

      {/* Tabs */}
      <div className="flex gap-1 px-6 mt-5 border-b border-border">
        {["Para ti", "Siguiendo", "Tendencias"].map((tab, i) => (
          <button key={tab}
            className={`px-4 py-2.5 text-[12px] cursor-pointer border-none bg-transparent border-b-2 -mb-px transition-colors duration-150 ${
              i === 0 ? "border-accent text-accent font-bold" : "border-transparent text-text font-medium hover:text-text-h"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="px-6 py-5 flex flex-col gap-0">
        {posts.map((post, idx) => (
          <article
            key={post.id}
            className="animate-fade-in"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <div className={`py-6 ${(post as any).milestone ? "bg-bg-surface border border-border rounded-2xl p-5 mb-4" : "border-b border-border"}`}>
              <div className="flex gap-3.5">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[12px] font-bold shrink-0"
                  style={{ background: post.avatarBg, color: post.avatarColor }}
                >
                  {post.initials}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[14px] font-bold text-text-h">{post.name}</span>
                      <span className="text-[12px] text-text ml-2 opacity-60">{post.handle}</span>
                      <span className="text-[11px] text-text opacity-40 ml-1.5">· {post.time}</span>
                    </div>
                    <button className="bg-transparent border-none cursor-pointer text-text p-1 hover:text-text-h rounded-md hover:bg-bg-hover transition-colors">
                      <MoreHorizontal size={15} strokeWidth={1.8} />
                    </button>
                  </div>

                  {post.text && (
                    <p className="text-[13.5px] text-text leading-[1.7] mb-3">{post.text}</p>
                  )}

                  {/* Code block */}
                  {(post as any).code && (
                    <div className="rounded-[10px] overflow-hidden border border-border mb-3.5">
                      <div className="bg-bg-hover px-3.5 py-2 flex justify-between items-center border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                          </div>
                          <span className="text-[10px] font-mono text-text opacity-60">{(post as any).codeFile}</span>
                        </div>
                        <button
                          className="text-[10px] text-text opacity-50 bg-transparent border-none cursor-pointer hover:opacity-100 hover:text-accent transition-colors"
                          onClick={() => success("Código copiado")}
                        >
                          Copiar
                        </button>
                      </div>
                      <pre className="m-0 p-4 bg-black text-[12px] font-mono text-accent overflow-x-auto leading-[1.7]">
                        <code>{(post as any).code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Tags */}
                  {(post as any).tags && (
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {(post as any).tags.map((tag: string) => (
                        <span key={tag} className="bg-accent-bg text-accent border border-accent-border text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Milestone */}
                  {(post as any).milestone && (
                    <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                      <div className="bg-bg-hover border border-border rounded-[10px] p-4 col-span-2">
                        <span className="text-[9px] font-bold text-accent uppercase tracking-[1.5px] block mb-1.5">Milestone</span>
                        <p className="text-[13px] text-text-h italic leading-[1.5] m-0">&ldquo;{(post as any).milestone.quote}&rdquo;</p>
                      </div>
                      <div className="bg-bg-hover border border-border rounded-[10px] p-4">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[26px] font-black text-text-h tracking-tight">{(post as any).milestone.stat}</span>
                          <span className="text-[11px] text-text">{(post as any).milestone.statLabel}</span>
                        </div>
                        <span className="text-[9px] font-bold text-text uppercase tracking-[1px] mt-1 block">{(post as any).milestone.statCaption}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-5 mt-1">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold transition-all duration-150 p-0 hover:scale-110 ${likes[post.id]?.liked ? "text-tertiary" : "text-text hover:text-tertiary"}`}
                    >
                      <Heart size={15} strokeWidth={1.8} fill={likes[post.id]?.liked ? "currentColor" : "none"} />
                      {fmt(likes[post.id]?.count ?? post.likes)}
                    </button>
                    <button
                      onClick={() => setCommenting(commenting === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold text-text hover:text-accent p-0 transition-colors"
                    >
                      <MessageSquare size={15} strokeWidth={1.8} />
                      {post.comments}
                    </button>
                    {post.shares > 0 && (
                      <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold text-text hover:text-online p-0 transition-colors">
                        <Repeat2 size={15} strokeWidth={1.8} />
                        {post.shares}
                      </button>
                    )}
                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold text-text hover:text-accent p-0 transition-colors ml-auto"
                    >
                      <Share2 size={15} strokeWidth={1.8} />
                    </button>
                  </div>

                  {/* Inline comment input */}
                  {commenting === post.id && (
                    <div className="flex gap-2.5 mt-4 animate-fade-in">
                      <div className="w-7 h-7 rounded-full bg-accent-bg text-accent flex items-center justify-center text-[10px] font-bold shrink-0">
                        AV
                      </div>
                      <div className="flex-1 flex gap-2">
                        <input
                          value={commentText}
                          onChange={e => setCommentText(e.target.value)}
                          placeholder="Escribe un comentario..."
                          autoFocus
                          className="flex-1 bg-bg-hover border border-border rounded-lg px-3 py-1.5 text-[12px] text-text-h outline-none focus:border-accent-border transition-colors"
                          onKeyDown={e => {
                            if (e.key === "Enter" && commentText.trim()) {
                              success("Comentario publicado")
                              setCommentText("")
                              setCommenting(null)
                            }
                          }}
                        />
                        <button
                          onClick={() => setCommenting(null)}
                          className="bg-transparent border-none cursor-pointer text-text p-1"
                        >
                          <X size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed right-6 bottom-6 w-12 h-12 rounded-[12px] bg-accent border-none cursor-pointer flex items-center justify-center z-50 shadow-2xl hover:opacity-85 transition-opacity animate-glow"
      >
        <Plus size={20} className="text-[#1a0033]" strokeWidth={2.5} />
      </button>
    </div>
  )
}
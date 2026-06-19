"use client"

import React, { useState, useEffect } from "react"
import {
  Heart, MessageSquare, Share2, MoreHorizontal, Repeat2,
  Image, Code2, Link, Send, Smile, X, ArrowUp,
} from "lucide-react"
import { useToast } from "@/src/components/ui/Toast"
import { PostSkeleton } from "@/src/components/ui"
import { Avatar } from "@/src/components/ui/Avatar"
import { Badge } from "@/src/components/ui/Badge"
import { Button } from "@/src/components/ui/Button"

interface FeedPost {
  id: number; time: string; liked: boolean; likes: number; comments: number; shares: number
  author: { initials: string; name: string; handle: string; avatarColor: string; avatarBg: string }
  text: string; code?: string; codeFile?: string; tags?: string[]; image?: string; premium?: boolean
  milestone?: { quote: string; stat: string; statLabel: string; statCaption: string }
}

const POSTS: FeedPost[] = [
  {
    id: 1, time: "2h", liked: false, likes: 1200, comments: 84, shares: 12,
    author: { initials: "JD", name: "James Dalton", handle: "@jdalton_dev", avatarColor: "var(--primary)", avatarBg: "var(--primary-soft)" },
    text: "Optimizando el loop de hidratación para el nuevo reactive engine. Reducimos TTI un 40% usando un custom worker-thread scheduler. Miren la implementación core:",
    code: `async function hydrate(root: Node) {\n  const patch = await worker.computeDiff(root);\n\n  requestIdleCallback(() => {\n    applyPatch(root, patch);\n  });\n}`,
    codeFile: "scheduler.ts",
  },
  {
    id: 2, time: "5h", liked: true, likes: 452, comments: 29, shares: 8,
    author: { initials: "ER", name: "Elena Rivera", handle: "@elena_codes", avatarColor: "var(--accent)", avatarBg: "var(--accent-soft)" },
    text: "Terminé la UI hardware-acelerada para el nuevo emulador de terminal. El tonal layering y los luminescent pulses se sienten mucho mejor que los bordes estándar.",
    tags: ["Design System", "Rust", "WGPU"],
  },
  {
    id: 3, time: "8h", liked: false, likes: 891, comments: 114, shares: 0,
    author: { initials: "SK", name: "Soren K.", handle: "@soren_kernel", avatarColor: "var(--secondary)", avatarBg: "var(--secondary-soft)" },
    text: "",
    milestone: {
      quote: "Shipped v2.0 of the decentralized storage layer. 0% downtime during migration.",
      stat: "142k", statLabel: "requests/s", statCaption: "Peak Throughput",
    },
  },
  {
    id: 4, time: "12h", liked: false, likes: 234, comments: 67, shares: 19,
    author: { initials: "MR", name: "María R.", handle: "@maria_oss", avatarColor: "#4ade80", avatarBg: "rgba(74,222,128,.12)" },
    text: "Finalmente entendí el ownership model de Rust después de 6 meses. El click que te da cuando todo hace sentido es increíble. Si están aprendiendo Rust, el libro de Jon Gjengset es OBLIGATORIO. No hay atajos en este lenguaje y eso es exactamente lo que lo hace hermoso.",
    tags: ["Rust", "Learning"],
  },
  {
    id: 5, time: "1d", liked: false, likes: 1876, comments: 312, shares: 88,
    author: { initials: "TS", name: "Tom Simons", handle: "@tsimons_dev", avatarColor: "#fb923c", avatarBg: "rgba(251,146,60,.12)" },
    text: "Hot take: La mayoría de microservicios deberían ser monolitos bien estructurados. La complejidad operacional de K8s + service mesh + distributed tracing no vale la pena para el 90% de los productos. Comiencen simple, escalen cuando el problema sea real.",
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
    <div
      className={`
        mx-6 mt-5 mb-3 rounded-[var(--radius-2xl)] border-2 transition-all duration-[var(--duration-normal)]
        ${focused
          ? "border-[var(--border-active)] shadow-[var(--shadow-glow)]"
          : "border-[var(--border)]"
        }
        bg-[var(--card-bg)]
      `}
    >
      <div className="flex gap-3 p-5">
        <Avatar initials="AV" color="var(--primary)" bg="var(--primary-soft)" size="md" />
        <div className="flex-1 min-w-0">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="¿Qué estás construyendo hoy?"
            rows={focused ? 3 : 1}
            className="w-full bg-transparent border-none outline-none text-sm text-[var(--text-h)] resize-none placeholder:text-[var(--text-muted)] leading-[1.7]"
          />
        </div>
      </div>
      {focused && (
        <div className="flex items-center justify-between px-5 pb-4 border-t border-[var(--border)] pt-3 animate-fade-in">
          <div className="flex gap-1">
            {[
              { Icon: Image, title: "Imagen" },
              { Icon: Code2, title: "Código" },
              { Icon: Link, title: "Link" },
              { Icon: Smile, title: "Emoji" },
            ].map(({ Icon, title }) => (
              <button
                key={title}
                title={title}
                className="p-2 rounded-[var(--radius-md)] text-[var(--text-muted)] bg-transparent border-none cursor-pointer hover:bg-[var(--bg-hover)] hover:text-[var(--text-h)] transition-colors"
              >
                <Icon size={14} strokeWidth={1.8} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-[10px] font-mono ${
                text.length > 280 ? "text-[var(--danger)]" : "text-[var(--text-muted)]"
              }`}
            >
              {text.length}/300
            </span>
            <Button size="sm" disabled={!text.trim()} onClick={submit}>
              <Send size={12} strokeWidth={2.5} />
              Publicar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function PostCard({ post, likes, onLike, onShare, onCommenting, commenting, commentText, setCommentText, idx }: {
  post: { author: { initials: string; name: string; handle: string; avatarColor: string; avatarBg: string }; content: string; image?: string; timestamp: string; comments: number; reposts: number; premium?: boolean }
  likes: number; onLike: () => void; onShare: () => void; onCommenting: () => void
  commenting: boolean; commentText: string; setCommentText: (v: string) => void; idx: number
}) {
  const { success } = useToast()
  const [heartPulse, setHeartPulse] = useState(false)
  const a = post.author

  function handleLike() {
    setHeartPulse(true)
    onLike(post.id)
    setTimeout(() => setHeartPulse(false), 400)
  }

  function fmt(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n)
  }

  return (
    <article className="animate-fade-in" style={{ animationDelay: `${idx * 40}ms` }}>
      {post.milestone ? (
        <div className="bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-surface-2)] border border-[var(--border)] rounded-[var(--radius-2xl)] p-6 mb-4 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--primary)]/5 rounded-full blur-[60px]" />
          <Badge variant="premium" className="mb-4 relative z-10">Milestone</Badge>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="col-span-2 bg-[var(--bg-hover)] rounded-[var(--radius-xl)] p-5">
              <p className="text-sm text-[var(--text-h)] italic leading-[1.7] m-0">
                &ldquo;{post.milestone.quote}&rdquo;
              </p>
            </div>
            <div className="bg-gradient-to-br from-[var(--primary-soft)] to-transparent border border-[var(--primary-border)] rounded-[var(--radius-xl)] p-5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[28px] font-black text-[var(--text-h)] tracking-tight">
                  {post.milestone.stat}
                </span>
                <span className="text-xs text-[var(--text-soft)]">{post.milestone.statLabel}</span>
              </div>
              <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-[1px] mt-1 block">
                {post.milestone.statCaption}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-5 border-b border-[var(--border)] last:border-0">
          <div className="flex gap-3.5">
            <Avatar
              initials={a.initials}
              color={a.avatarColor}
              bg={a.avatarBg}
              size="md"
              shape="rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-sm font-bold text-[var(--text-h)]">{a.name}</span>
                  <span className="text-sm text-[var(--text-soft)] ml-2">{a.handle}</span>
                  <span className="text-xs text-[var(--text-muted)] ml-1.5">· {post.time}</span>
                </div>
                <button className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] p-1 hover:text-[var(--text-h)] rounded-[var(--radius-md)] hover:bg-[var(--bg-hover)] transition-colors" aria-label="Más opciones">
                  <MoreHorizontal size={15} strokeWidth={1.8} />
                </button>
              </div>

              {post.text && (
                <p className="text-sm text-[var(--text)] leading-[1.7] mb-3">{post.text}</p>
              )}

              {post.code && (
                <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] mb-3.5">
                  <div className="bg-[var(--bg-hover)] px-4 py-2.5 flex justify-between items-center border-b border-[var(--border)]">
                    <div className="flex items-center gap-2.5">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-soft)]">{post.codeFile}</span>
                    </div>
                    <button
                      onClick={() => success("Código copiado")}
                      className="text-[10px] text-[var(--text-soft)] bg-transparent border-none cursor-pointer hover:text-[var(--primary)] transition-colors font-semibold"
                    >
                      Copiar
                    </button>
                  </div>
                  <pre className="m-0 p-5 bg-[var(--color-black)] text-xs font-mono text-[var(--primary)] overflow-x-auto leading-[1.8]">
                    <code>{post.code}</code>
                  </pre>
                </div>
              )}

              {post.tags && (
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="accent">{tag}</Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-5 mt-1">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-bold transition-all duration-[var(--duration-fast)] p-0 ${
                    likes[post.id]?.liked
                      ? "text-[var(--danger)]"
                      : "text-[var(--text-soft)] hover:text-[var(--danger)]"
                  } ${heartPulse ? "animate-heart-pop" : ""}`}
                >
                  <Heart
                    size={16}
                    strokeWidth={1.8}
                    fill={likes[post.id]?.liked ? "currentColor" : "none"}
                  />
                  {fmt(likes[post.id]?.count ?? post.likes)}
                </button>
                <button
                  onClick={() => onCommenting(post.id)}
                  className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-bold text-[var(--text-soft)] hover:text-[var(--primary)] p-0 transition-colors"
                >
                  <MessageSquare size={16} strokeWidth={1.8} />
                  {post.comments}
                </button>
                {post.shares > 0 && (
                  <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-bold text-[var(--text-soft)] hover:text-[var(--online)] p-0 transition-colors">
                    <Repeat2 size={16} strokeWidth={1.8} />
                    {post.shares}
                  </button>
                )}
                <button
                  onClick={() => onShare(post.id)}
                  className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-bold text-[var(--text-soft)] hover:text-[var(--primary)] p-0 transition-colors ml-auto"
                >
                  <Share2 size={16} strokeWidth={1.8} />
                </button>
              </div>

              {commenting === post.id && (
                <div className="flex gap-2.5 mt-4 animate-fade-in">
                  <Avatar initials="AV" color="var(--primary)" bg="var(--primary-soft)" size="sm" />
                  <div className="flex-1 flex gap-2">
                    <input
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      placeholder="Escribe un comentario..."
                      autoFocus
                      className="flex-1 bg-[var(--bg-hover)] border-2 border-[var(--border)] rounded-[var(--radius-md)] px-3 py-1.5 text-sm text-[var(--text-h)] outline-none focus:border-[var(--border-active)] transition-colors"
                      onKeyDown={e => {
                        if (e.key === "Enter" && commentText.trim()) {
                          success("Comentario publicado")
                          setCommentText("")
                          onCommenting(null)
                        }
                      }}
                    />
                    <button
                      onClick={() => onCommenting(null)}
                      className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] p-1 hover:text-[var(--text-h)]"
                    >
                      <X size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default function Feed() {
  const { success } = useToast()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(POSTS)
  const [likes, setLikes] = useState<Record<number, { count: number; liked: boolean }>>(
    Object.fromEntries(POSTS.map(p => [p.id, { count: p.likes, liked: p.liked }]))
  )
  const [commenting, setCommenting] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [activeTab, setActiveTab] = useState(0)
  const feedRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  function toggleLike(id: number) {
    setLikes(prev => ({
      ...prev,
      [id]: { count: prev[id].liked ? prev[id].count - 1 : prev[id].count + 1, liked: !prev[id].liked },
    }))
  }

  function handleNewPost(text: string) {
    const newPost: FeedPost = {
      id: Date.now(), time: "ahora", liked: false, likes: 0, comments: 0, shares: 0,
      author: { initials: "AV", name: "Alex Volkov", handle: "@alex_volkov", avatarColor: "var(--primary)", avatarBg: "var(--primary-soft)" },
      text, image: undefined, premium: undefined,
    }
    setPosts(prev => [newPost, ...prev])
    setLikes(prev => ({ ...prev, [newPost.id]: { count: 0, liked: false } }))
    success("Post publicado", "Tu post es visible en el feed")
  }

  function handleShare() {
    success("Enlace copiado", "El enlace del post fue copiado al portapapeles")
  }

  function scrollToTop() {
    feedRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const TABS = ["Para ti", "Siguiendo", "Tendencias"]

  return (
    <div className="relative pb-24" ref={feedRef}>
      <div className="flex items-center gap-2 px-6 pt-5">
        <span className="relative flex w-2 h-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--online)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--online)]" />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[var(--text-muted)]">
          Actividad en vivo · 124 devs activos
        </span>
      </div>

      <Composer onPost={handleNewPost} />

      <div className="flex gap-1 px-6 mt-2 border-b border-[var(--border)]">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-3 text-sm cursor-pointer border-none bg-transparent border-b-2 -mb-px transition-all duration-[var(--duration-fast)] ${
              i === activeTab
                ? "border-[var(--primary)] text-[var(--primary)] font-bold"
                : "border-transparent text-[var(--text-soft)] font-semibold hover:text-[var(--text-h)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-6 py-4 flex flex-col gap-0">
        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          posts.map((post, idx) => (
            <PostCard
              key={post.id}
              post={post}
              likes={likes}
              onLike={toggleLike}
              onShare={handleShare}
              onCommenting={setCommenting}
              commenting={commenting}
              commentText={commentText}
              setCommentText={setCommentText}
              idx={idx}
            />
          ))
        )}
      </div>

      <button
        onClick={scrollToTop}
        className="fixed right-6 bottom-6 w-12 h-12 rounded-[var(--radius-xl)] bg-[var(--primary)] border-2 border-[var(--primary)] cursor-pointer flex items-center justify-center z-50 shadow-[var(--shadow-glow)] hover:brightness-110 hover:-translate-y-0.5 transition-all animate-glow"
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} className="text-white" strokeWidth={2.5} />
      </button>
    </div>
  )
}

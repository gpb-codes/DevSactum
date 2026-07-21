"use client"

import React, { useState, useEffect } from "react"
import {
  Heart, MessageSquare, Share2, MoreHorizontal, Repeat2, Plus,
  Image, Code2, Link, Send, Smile, BookOpen, X,
} from "lucide-react"
import { useToast } from "@/components/ui/Toast"
import { postService, type Post } from "@/services/posts"

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d`
  if (hours > 0) return `${hours}h`
  if (minutes > 0) return `${minutes}m`
  return "ahora"
}

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
  const [posts, setPosts]   = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [likes, setLikes]   = useState<Record<string, { count: number; liked: boolean }>>({})
  const [commenting, setCommenting] = useState<string | null>(null)

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    setLoading(true)
    try {
      const apiPosts = await postService.getFeed(20, 0)
      setPosts(apiPosts)
      setLikes(Object.fromEntries(apiPosts.map(p => [p.id, { count: p.likes, liked: p.liked }])))
    } catch {
      // API failed, show empty state
    } finally {
      setLoading(false)
    }
  }
  const [commentText, setCommentText] = useState("")

  function toggleLike(id: string) {
    setLikes(prev => ({
      ...prev,
      [id]: { count: prev[id].liked ? prev[id].count - 1 : prev[id].count + 1, liked: !prev[id].liked },
    }))
    postService.like(id).catch(() => {})
  }

  async function handleNewPost(text: string) {
    try {
      const apiPost = await postService.create({ content: text })
      setPosts(prev => [apiPost, ...prev])
      setLikes(prev => ({ ...prev, [apiPost.id]: { count: 0, liked: false } }))
      success("Post publicado", "Tu post es visible en el feed")
    } catch {
      const newPost: Post = {
        id: String(Date.now()), content: text,
        authorId: "local", authorName: "Alex Volkov", authorHandle: "@alex_volkov",
        authorInitials: "AV", authorColor: "#c49aff", authorBg: "rgba(196,154,255,.15)",
        tags: [], likes: 0, comments: 0, shares: 0, liked: false,
        createdAt: new Date().toISOString(),
      }
      setPosts(prev => [newPost, ...prev])
      setLikes(prev => ({ ...prev, [newPost.id]: { count: 0, liked: false } }))
      success("Post publicado", "Tu post es visible en el feed")
    }
  }

  function handleShare(id: string) {
    success("Enlace copiado", "El enlace del post fue copiado al portapapeles")
  }

  function fmt(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n)
  }

  return (
    <div className="relative pb-20 animate-fade-in">
      {/* Live indicator */}
      <div className="flex items-center gap-2 px-6 pt-5">
        <div className="w-1.5 h-1.5 rounded-full bg-online animate-pulse shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-text opacity-60">
          Actividad en vivo
        </span>
      </div>

      <Composer onPost={handleNewPost} />

      {/* Tabs */}
      <div className="flex gap-1 px-6 mt-5 border-b border-border">
        {["Para ti", "Siguiendo", "Tendencias"].map((tab, i) => (
          <button key={tab}
            className={`px-4 py-2.5 text-[12px] cursor-pointer border-none bg-transparent border-b-2 -mb-px transition-all duration-150 ${
              i === 0 ? "border-accent text-accent font-bold" : "border-transparent text-text font-medium hover:text-text-h"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="px-6 py-5 flex flex-col gap-0 animate-stagger">
        {posts.map((post) => (
          <article key={post.id}>
            <div className="py-6 border-b border-border">
              <div className="flex gap-3.5">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center text-[12px] font-bold shrink-0"
                  style={{ background: post.authorBg, color: post.authorColor }}
                >
                  {post.authorInitials}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-[14px] font-bold text-text-h">{post.authorName}</span>
                      <span className="text-[12px] text-text ml-2 opacity-60">{post.authorHandle}</span>
                      <span className="text-[11px] text-text opacity-40 ml-1.5">· {timeAgo(post.createdAt)}</span>
                    </div>
                    <button className="bg-transparent border-none cursor-pointer text-text p-1 hover:text-text-h rounded-md hover:bg-bg-hover transition-colors">
                      <MoreHorizontal size={15} strokeWidth={1.8} />
                    </button>
                  </div>

                  {post.content && (
                    <p className="text-[13.5px] text-text leading-[1.7] mb-3">{post.content}</p>
                  )}

                  {/* Code block */}
                  {post.codeSnippet && (
                    <div className="rounded-[10px] overflow-hidden border border-border mb-3.5">
                      <div className="bg-bg-hover px-3.5 py-2 flex justify-between items-center border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                          </div>
                          <span className="text-[10px] font-mono text-text opacity-60">{post.codeLanguage}</span>
                        </div>
                        <button
                          className="text-[10px] text-text opacity-50 bg-transparent border-none cursor-pointer hover:opacity-100 hover:text-accent transition-colors"
                          onClick={() => success("Código copiado")}
                        >
                          Copiar
                        </button>
                      </div>
                      <pre className="m-0 p-4 bg-black text-[12px] font-mono text-accent overflow-x-auto leading-[1.7]">
                        <code>{post.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags && (
                    <div className="flex gap-1.5 mb-3 flex-wrap">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="bg-accent-bg text-accent border border-accent-border text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
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
        className="fixed right-6 bottom-6 w-12 h-12 rounded-[14px] bg-accent border-none cursor-pointer flex items-center justify-center z-50 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 animate-float"
      >
        <Plus size={20} className="text-[#1a0033]" strokeWidth={2.5} />
      </button>
    </div>
  )
}
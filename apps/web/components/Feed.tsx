"use client"

import React, { useState } from "react"
import { Heart, MessageSquare, Share2, MoreHorizontal, Repeat2, Plus } from "lucide-react"

const POSTS = [
  {
    id: 1,
    initials: "JD",
    name: "James Dalton",
    handle: "@jdalton_dev",
    time: "2h ago",
    text: "Optimizing the hydration loop for the new reactive engine. Reduced TTI by 40% using a custom worker-thread scheduler. Check out the core implementation:",
    code: `async function hydrate(root: Node) {
  // Offload expensive diffing to Worker
  const patch = await worker.computeDiff(root);

  requestIdleCallback(() => {
    applyPatch(root, patch);
  });
}`,
    likes: 1200, comments: 84, shares: 12,
    liked: false,
    avatarColor: "#c49aff", avatarBg: "rgba(196,154,255,.15)",
  },
  {
    id: 2,
    initials: "ER",
    name: "Elena Rivera",
    handle: "@elena_codes",
    time: "5h ago",
    text: "Just finished the hardware-accelerated UI for the new terminal emulator. Tonal layering and luminescent pulses feel so much better than standard borders.",
    tags: ["Design System", "Rust"],
    likes: 452, comments: 29, shares: 8,
    liked: true,
    avatarColor: "#ff94a8", avatarBg: "rgba(255,148,168,.15)",
  },
  {
    id: 3,
    initials: "SK",
    name: "Soren K.",
    handle: "@soren_kernel",
    time: "8h ago",
    text: "",
    milestone: { quote: "Shipped v2.0 of the decentralized storage layer. 0% downtime during migration.", stat: "142k", statLabel: "requests/s", statCaption: "Peak Throughput" },
    likes: 891, comments: 114, shares: 0,
    liked: false,
    avatarColor: "#60a5fa", avatarBg: "rgba(96,165,250,.12)",
  },
]

export default function Feed() {
  const [likes, setLikes] = useState<Record<number, { count: number; liked: boolean }>>(
    Object.fromEntries(POSTS.map((p) => [p.id, { count: p.likes, liked: p.liked }]))
  )

  function toggleLike(id: number) {
    setLikes((prev) => ({
      ...prev,
      [id]: { count: prev[id].liked ? prev[id].count - 1 : prev[id].count + 1, liked: !prev[id].liked },
    }))
  }

  function fmt(n: number) {
    return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n)
  }

  return (
    <div className="feed-area" style={{ position: "relative" }}>
      {/* Live pulse */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 24px 0" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--tertiary)", flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--text)" }}>
          Live activity from your cluster
        </span>
      </div>

      {/* Posts */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 32 }}>
        {POSTS.map((post) => (
          <article
            key={post.id}
            style={{
              background: post.milestone ? "var(--bg-surface)" : "transparent",
              border: post.milestone ? "1px solid var(--border)" : "none",
              borderRadius: post.milestone ? 16 : 0,
              padding: post.milestone ? 24 : "0 0 32px",
              borderBottom: post.milestone ? "none" : "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", gap: 16 }}>
              {/* Avatar */}
              <div style={{ width: 44, height: 44, borderRadius: 10, background: post.avatarBg, color: post.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                {post.initials}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-h)" }}>{post.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text)", marginTop: 2 }}>{post.handle} · {post.time}</div>
                  </div>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", padding: 4 }}>
                    <MoreHorizontal size={16} strokeWidth={1.8} />
                  </button>
                </div>

                {/* Text */}
                {post.text && (
                  <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7, marginBottom: 12 }}>
                    {post.text}
                  </p>
                )}

                {/* Code block */}
                {post.code && (
                  <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)", marginBottom: 14 }}>
                    <div style={{ background: "var(--bg-hover)", padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, fontFamily: "monospace", color: "var(--text)", textTransform: "uppercase", letterSpacing: 1 }}>scheduler.ts</span>
                    </div>
                    <pre style={{ margin: 0, padding: "16px", background: "#000", fontSize: 12, fontFamily: "monospace", color: "#c49aff", overflowX: "auto", lineHeight: 1.6 }}>
                      <code>{post.code}</code>
                    </pre>
                  </div>
                )}

                {/* Tags */}
                {post.tags && (
                  <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                    {post.tags.map((tag) => (
                      <span key={tag} style={{ background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Milestone bento */}
                {post.milestone && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, marginBottom: 14 }}>
                    <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border)", borderRadius: 10, padding: 16 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 8 }}>Milestone</span>
                      <p style={{ fontSize: 13, color: "var(--text-h)", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>"{post.milestone.quote}"</p>
                    </div>
                    <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border)", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: 28, fontWeight: 900, color: "var(--text-h)", letterSpacing: "-1px" }}>{post.milestone.stat}</span>
                        <span style={{ fontSize: 11, color: "var(--text)" }}>{post.milestone.statLabel}</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{post.milestone.statCaption}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div style={{ display: "flex", gap: 24 }}>
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: likes[post.id].liked ? "var(--tertiary)" : "var(--text)", transition: "color .15s", padding: 0 }}
                  >
                    <Heart size={16} strokeWidth={1.8} fill={likes[post.id].liked ? "currentColor" : "none"} />
                    {fmt(likes[post.id].count)}
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--text)", padding: 0 }}>
                    <MessageSquare size={16} strokeWidth={1.8} />
                    {post.comments}
                  </button>
                  {post.shares > 0 && (
                    <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--text)", padding: 0 }}>
                      <Repeat2 size={16} strokeWidth={1.8} />
                      {post.shares}
                    </button>
                  )}
                  <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "var(--text)", padding: 0 }}>
                    <Share2 size={16} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* FAB */}
      <button style={{ position: "fixed", right: 24, bottom: 24, width: 52, height: 52, borderRadius: 12, background: "var(--accent)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
        <Plus size={20} style={{ color: "#1a0033" }} strokeWidth={2.5} />
      </button>
    </div>
  )
}
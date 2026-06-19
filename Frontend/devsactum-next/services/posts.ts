import { apiGo, apiNestjs } from "@/lib/api"

export interface Post {
  id: string
  content: string
  authorId: string
  authorName: string
  authorHandle: string
  authorInitials: string
  authorColor: string
  authorBg: string
  tags: string[]
  codeSnippet?: string
  codeLanguage?: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  createdAt: string
}

interface RawPost {
  id: string
  content: string
  user_id: string
  username?: string
  display_name?: string
  tags?: string
  code_snippet?: string
  code_language?: string
  likes_count: number
  comments_count: number
  created_at: string
}

function mapPost(raw: RawPost): Post {
  const tags = raw.tags ? raw.tags.split(",").map(t => t.trim()).filter(Boolean) : []
  const name = raw.display_name || raw.username || "Unknown"
  const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
  const colors = ["#c49aff", "#ff94a8", "#60a5fa", "#4ade80", "#f59e0b"]
  const colorIdx = raw.user_id.charCodeAt(0) % colors.length

  return {
    id: raw.id,
    content: raw.content,
    authorId: raw.user_id,
    authorName: name,
    authorHandle: `@${raw.username || "user"}`,
    authorInitials: initials,
    authorColor: colors[colorIdx],
    authorBg: `${colors[colorIdx]}22`,
    tags,
    codeSnippet: raw.code_snippet,
    codeLanguage: raw.code_language,
    likes: raw.likes_count || 0,
    comments: raw.comments_count || 0,
    shares: 0,
    liked: false,
    createdAt: raw.created_at,
  }
}

export const postService = {
  getFeed: async (limit = 20, offset = 0): Promise<Post[]> => {
    try {
      const res = await apiGo.get<{ posts: RawPost[] }>(`/posts?limit=${limit}&offset=${offset}`)
      return res.posts.map(mapPost)
    } catch {
      const res = await apiNestjs.get<{ posts: RawPost[] }>(`/posts?limit=${limit}&offset=${offset}`)
      return res.posts.map(mapPost)
    }
  },

  getById: async (id: string): Promise<Post> => {
    const res = await apiGo.get<{ post: RawPost }>(`/posts/${id}`)
    return mapPost(res.post)
  },

  create: async (data: { content: string; tags?: string[]; codeSnippet?: string; codeLanguage?: string }): Promise<Post> => {
    const res = await apiNestjs.post<{ post: RawPost }>("/posts", {
      content: data.content,
      tags: data.tags?.join(","),
      code_snippet: data.codeSnippet,
      code_language: data.codeLanguage,
    })
    return mapPost(res.post)
  },

  like: async (id: string): Promise<Post> => {
    const res = await apiGo.post<{ post: RawPost }>(`/posts/${id}/like`)
    return mapPost(res.post)
  },

  delete: async (id: string): Promise<void> => {
    await apiGo.delete(`/posts/${id}`)
  },

  getByUser: async (userId: string, limit = 20, offset = 0): Promise<Post[]> => {
    const res = await apiGo.get<{ posts: RawPost[] }>(`/posts/user/${userId}?limit=${limit}&offset=${offset}`)
    return res.posts.map(mapPost)
  },

  getByTag: async (tag: string, limit = 20, offset = 0): Promise<Post[]> => {
    const res = await apiGo.get<{ posts: RawPost[] }>(`/posts/tag/${tag}?limit=${limit}&offset=${offset}`)
    return res.posts.map(mapPost)
  },
}

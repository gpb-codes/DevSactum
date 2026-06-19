import { apiGo, apiNestjs } from "@/lib/api"

export interface ReputationProfile {
  userId: string
  score: number
  level: string
  stack: string[]
  title?: string
  bio?: string
}

export interface ReputationEvent {
  id: string
  userId: string
  type: string
  points: number
  description: string
  createdAt: string
}

export interface LeaderboardEntry {
  userId: string
  username: string
  displayName: string
  score: number
  level: string
}

interface RawProfile {
  id: string
  user_id: string
  display_name?: string
  username?: string
  stack?: string
  level?: string
  reputation_score?: number
  title?: string
  bio?: string
}

interface RawEvent {
  id: string
  user_id: string
  event_type: string
  points: number
  description: string
  created_at: string
}

function mapProfile(raw: RawProfile): ReputationProfile {
  const stack = raw.stack ? raw.stack.split(",").map(s => s.trim()) : []
  return {
    userId: raw.user_id,
    score: raw.reputation_score || 0,
    level: raw.level || "junior",
    stack,
    title: raw.title,
    bio: raw.bio,
  }
}

function mapEvent(raw: RawEvent): ReputationEvent {
  return {
    id: raw.id,
    userId: raw.user_id,
    type: raw.event_type,
    points: raw.points,
    description: raw.description,
    createdAt: raw.created_at,
  }
}

export const reputationService = {
  getProfile: async (userId: string): Promise<ReputationProfile> => {
    try {
      const res = await apiGo.get<{ profile: RawProfile }>(`/reputation/user/${userId}`)
      return mapProfile(res.profile)
    } catch {
      const res = await apiNestjs.get<{ profile: RawProfile }>(`/reputation/user/${userId}`)
      return mapProfile(res.profile)
    }
  },

  getHistory: async (userId: string): Promise<ReputationEvent[]> => {
    try {
      const res = await apiGo.get<{ events: RawEvent[] }>(`/reputation/user/${userId}/history`)
      return res.events.map(mapEvent)
    } catch {
      const res = await apiNestjs.get<{ events: RawEvent[] }>(`/reputation/user/${userId}/history`)
      return res.events.map(mapEvent)
    }
  },

  getLeaderboard: async (limit = 20): Promise<LeaderboardEntry[]> => {
    try {
      const res = await apiGo.get<{ leaderboard: LeaderboardEntry[] }>(`/reputation/leaderboard?limit=${limit}`)
      return res.leaderboard
    } catch {
      const res = await apiNestjs.get<{ leaderboard: LeaderboardEntry[] }>(`/reputation/leaderboard?limit=${limit}`)
      return res.leaderboard
    }
  },
}

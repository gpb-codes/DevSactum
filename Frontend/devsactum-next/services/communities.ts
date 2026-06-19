import { apiGo, apiNestjs } from "@/lib/api"

export interface Community {
  id: string
  name: string
  description: string
  icon: string
  memberCount: number
  onlineCount: number
  isMember: boolean
  createdBy: string
  createdAt: string
}

interface RawCommunity {
  id: string
  name: string
  description?: string
  icon?: string
  members_count?: number
  online_count?: number
  creator_id?: string
  created_at: string
}

function mapCommunity(raw: RawCommunity): Community {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description || "",
    icon: raw.icon || "Code2",
    memberCount: raw.members_count || 0,
    onlineCount: raw.online_count || 0,
    isMember: false,
    createdBy: raw.creator_id || "",
    createdAt: raw.created_at,
  }
}

export const communityService = {
  list: async (limit = 20, offset = 0): Promise<Community[]> => {
    try {
      const res = await apiGo.get<{ communities: RawCommunity[] }>(`/communities?limit=${limit}&offset=${offset}`)
      return res.communities.map(mapCommunity)
    } catch {
      const res = await apiNestjs.get<{ communities: RawCommunity[] }>(`/communities?limit=${limit}&offset=${offset}`)
      return res.communities.map(mapCommunity)
    }
  },

  getById: async (id: string): Promise<Community> => {
    const res = await apiGo.get<{ community: RawCommunity }>(`/communities/${id}`)
    return mapCommunity(res.community)
  },

  create: async (data: { name: string; description?: string }): Promise<Community> => {
    const res = await apiNestjs.post<{ community: RawCommunity }>("/communities", data)
    return mapCommunity(res.community)
  },

  join: async (id: string): Promise<void> => {
    await apiGo.post(`/communities/${id}/join`, {})
  },

  leave: async (id: string): Promise<void> => {
    await apiGo.post(`/communities/${id}/leave`, {})
  },

  delete: async (id: string): Promise<void> => {
    await apiNestjs.delete(`/communities/${id}`)
  },
}

import { apiGo, apiNestjs } from "@/lib/api"

export interface Message {
  id: string
  content: string
  senderId: string
  senderName: string
  senderInitials: string
  receiverId?: string
  communityId?: string
  read: boolean
  createdAt: string
}

interface RawMessage {
  id: string
  content: string
  sender_id: string
  sender_name?: string
  receiver_id?: string
  community_id?: string
  is_read: boolean
  created_at: string
}

function mapMessage(raw: RawMessage): Message {
  const name = raw.sender_name || "User"
  const initials = name.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
  return {
    id: raw.id,
    content: raw.content,
    senderId: raw.sender_id,
    senderName: name,
    senderInitials: initials,
    receiverId: raw.receiver_id,
    communityId: raw.community_id,
    read: raw.is_read,
    createdAt: raw.created_at,
  }
}

export const messageService = {
  send: async (data: { content: string; receiverId?: string; communityId?: string }): Promise<Message> => {
    const res = await apiNestjs.post<{ message: RawMessage }>("/messages", {
      content: data.content,
      receiver_id: data.receiverId,
      community_id: data.communityId,
    })
    return mapMessage(res.message)
  },

  getDirect: async (userId1: string, userId2: string, limit = 50, offset = 0): Promise<Message[]> => {
    const res = await apiNestjs.get<{ messages: RawMessage[] }>(
      `/messages/direct/${userId1}/${userId2}?limit=${limit}&offset=${offset}`
    )
    return res.messages.map(mapMessage)
  },

  getCommunity: async (communityId: string, limit = 50, offset = 0): Promise<Message[]> => {
    const res = await apiNestjs.get<{ messages: RawMessage[] }>(
      `/messages/community/${communityId}?limit=${limit}&offset=${offset}`
    )
    return res.messages.map(mapMessage)
  },

  getUnreadCount: async (userId: string): Promise<number> => {
    const res = await apiNestjs.get<{ unread_count: number }>(`/messages/unread/${userId}`)
    return res.unread_count
  },

  markAsRead: async (messageId: string): Promise<void> => {
    await apiNestjs.post(`/messages/${messageId}/read`)
  },
}

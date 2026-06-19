"use client"

import { useCallback } from "react"
import { useNotifications, type NotificationType } from "@/context/NotificationsContext"
import { getWSClient } from "@/lib/websocket"

export function useNotify() {
  const { addNotification } = useNotifications()

  const notify = useCallback((
    type: NotificationType,
    title: string,
    message: string,
    options?: { actorName?: string; link?: string; targetUserId?: string }
  ) => {
    addNotification({ type, title, message, actorName: options?.actorName, link: options?.link })

    const client = getWSClient()
    if (client && options?.targetUserId) {
      client.send({
        type: "notification",
        data: { targetUserId: options.targetUserId, type, title, message, actorName: options.actorName },
      })
    }
  }, [addNotification])

  const notifyLike = useCallback((actorName: string, postTitle: string, targetUserId?: string) => {
    notify("like", `${actorName} dio like`, `Le gustó tu post: "${postTitle.slice(0, 60)}..."`, { actorName, targetUserId })
  }, [notify])

  const notifyComment = useCallback((actorName: string, postTitle: string, targetUserId?: string) => {
    notify("comment", `${actorName} comentó`, `Comentó en: "${postTitle.slice(0, 60)}..."`, { actorName, link: "/feed", targetUserId })
  }, [notify])

  const notifyFollow = useCallback((actorName: string, targetUserId?: string) => {
    notify("follow", `${actorName} te siguió`, "Ahora sigue tu actividad", { actorName, targetUserId })
  }, [notify])

  const notifyMention = useCallback((actorName: string, context: string, targetUserId?: string) => {
    notify("mention", `${actorName} te mencionó`, `En: "${context.slice(0, 60)}..."`, { actorName, targetUserId })
  }, [notify])

  const notifyJob = useCallback((title: string, company: string) => {
    notify("job", title, `Nueva oportunidad en ${company}`)
  }, [notify])

  const notifyAchievement = useCallback((badgeName: string) => {
    notify("achievement", "¡Nuevo logro!", `Desbloqueaste: ${badgeName}`)
  }, [notify])

  const notifySecurity = useCallback((action: string) => {
    notify("security", "Alerta de seguridad", action)
  }, [notify])

  return { notify, notifyLike, notifyComment, notifyFollow, notifyMention, notifyJob, notifyAchievement, notifySecurity }
}

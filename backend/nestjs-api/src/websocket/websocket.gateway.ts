import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Server, WebSocket } from 'ws'

interface WsClient extends WebSocket {
  room?: string
}

@WebSocketGateway({
  cors: { origin: '*' },
  path: '/ws',
})
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private userSockets = new Map<string, Set<WsClient>>()

  handleConnection(client: WsClient, req: any) {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const userId = url.searchParams.get('userId')

    if (userId) {
      const sockets = this.userSockets.get(userId) || new Set()
      sockets.add(client)
      this.userSockets.set(userId, sockets)
    }

    client.on('message', (raw: Buffer) => {
      try {
        const msg = JSON.parse(raw.toString())
        this.handleMessage(client, msg, userId)
      } catch { }
    })

    client.on('close', () => {
      if (userId) {
        const sockets = this.userSockets.get(userId)
        if (sockets) {
          sockets.delete(client)
          if (sockets.size === 0) this.userSockets.delete(userId)
        }
      }
    })
  }

  handleDisconnect(client: WsClient) {
    for (const [userId, sockets] of this.userSockets.entries()) {
      if (sockets.has(client)) {
        sockets.delete(client)
        if (sockets.size === 0) this.userSockets.delete(userId)
        break
      }
    }
  }

  private handleMessage(client: WsClient, msg: any, userId: string | null) {
    switch (msg.type) {
      case 'ping':
        client.send(JSON.stringify({ type: 'pong' }))
        break

      case 'join_room':
        client.room = msg.room
        break

      case 'leave_room':
        client.room = undefined
        break

      case 'chat_message':
        this.server.clients.forEach((c: WebSocket) => {
          const ws = c as WsClient
          if (ws.room === msg.room && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'chat_message',
              room: msg.room,
              content: msg.content,
              sender: msg.sender,
              timestamp: Date.now(),
            }))
          }
        })
        break

      case 'direct_message':
        const targetSockets = this.userSockets.get(msg.receiverId)
        if (targetSockets) {
          targetSockets.forEach(ws => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({
                type: 'direct_message',
                content: msg.content,
                sender: msg.sender,
                senderId: userId,
                timestamp: Date.now(),
              }))
            }
          })
        }
        break

      case 'typing':
        this.server.clients.forEach((c: WebSocket) => {
          const ws = c as WsClient
          if (ws.room === msg.room && ws !== client && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: 'typing',
              room: msg.room,
              data: msg.data,
              senderId: userId,
            }))
          }
        })
        break
    }
  }

  sendToUser(userId: string, event: string, data: unknown) {
    const sockets = this.userSockets.get(userId)
    if (sockets) {
      const msg = JSON.stringify({ type: event, data })
      sockets.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) ws.send(msg)
      })
    }
  }

  sendToRoom(room: string, event: string, data: unknown) {
    const msg = JSON.stringify({ type: event, data })
    this.server.clients.forEach((c: WebSocket) => {
      const ws = c as WsClient
      if (ws.room === room && ws.readyState === WebSocket.OPEN) {
        ws.send(msg)
      }
    })
  }
}

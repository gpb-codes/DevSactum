import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  namespace: '/',
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, Set<string>>();
  private roomUsers = new Map<string, Set<string>>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string || 'anonymous';
    client.data.userId = userId;

    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, new Set());
    }
    this.userSockets.get(userId)!.add(client.id);

    console.log(`[WS] Client connected: ${client.id} (user: ${userId})`);
    client.emit('connected', { clientId: client.id, userId });

    this.server.emit('online_count', this.getOnlineCount());
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    const sockets = this.userSockets.get(userId);
    if (sockets) {
      sockets.delete(client.id);
      if (sockets.size === 0) {
        this.userSockets.delete(userId);
      }
    }

    for (const [room, users] of this.roomUsers) {
      users.delete(userId);
      if (users.size === 0) {
        this.roomUsers.delete(room);
      }
    }

    console.log(`[WS] Client disconnected: ${client.id}`);
    this.server.emit('online_count', this.getOnlineCount());
  }

  @SubscribeMessage('join_room')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ) {
    const userId = client.data.userId;
    client.join(data.room);

    if (!this.roomUsers.has(data.room)) {
      this.roomUsers.set(data.room, new Set());
    }
    this.roomUsers.get(data.room)!.add(userId);

    this.server.to(data.room).emit('user_joined', {
      userId,
      room: data.room,
      onlineCount: this.roomUsers.get(data.room)?.size || 0,
    });

    client.emit('room_joined', {
      room: data.room,
      onlineCount: this.roomUsers.get(data.room)?.size || 0,
    });
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ) {
    const userId = client.data.userId;
    client.leave(data.room);

    const users = this.roomUsers.get(data.room);
    if (users) {
      users.delete(userId);
      if (users.size === 0) {
        this.roomUsers.delete(data.room);
      }
    }

    this.server.to(data.room).emit('user_left', {
      userId,
      room: data.room,
      onlineCount: this.roomUsers.get(data.room)?.size || 0,
    });
  }

  @SubscribeMessage('chat_message')
  handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; content: string; senderName: string },
  ) {
    const userId = client.data.userId;
    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      room: data.room,
      senderId: userId,
      senderName: data.senderName,
      content: data.content,
      timestamp: Date.now(),
    };

    this.server.to(data.room).emit('chat_message', message);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; isTyping: boolean },
  ) {
    const userId = client.data.userId;
    client.to(data.room).emit('typing', {
      userId,
      room: data.room,
      isTyping: data.isTyping,
    });
  }

  @SubscribeMessage('direct_message')
  handleDirectMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { receiverId: string; content: string; senderName: string },
  ) {
    const userId = client.data.userId;
    const message = {
      id: `dm-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      senderId: userId,
      senderName: data.senderName,
      receiverId: data.receiverId,
      content: data.content,
      timestamp: Date.now(),
    };

    this.server.to(`user:${data.receiverId}`).emit('direct_message', message);
    this.server.to(`user:${userId}`).emit('direct_message', message);
  }

  @SubscribeMessage('notification')
  handleNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { targetUserId: string; type: string; message: string },
  ) {
    this.server.to(`user:${data.targetUserId}`).emit('notification', {
      type: data.type,
      message: data.message,
      timestamp: Date.now(),
    });
  }

  @SubscribeMessage('join_user_room')
  handleJoinUserRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ) {
    client.join(`user:${data.userId}`);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong');
  }

  broadcastToRoom(room: string, event: string, data: unknown) {
    this.server.to(room).emit(event, data);
  }

  sendToUser(userId: string, event: string, data: unknown) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  private getOnlineCount(): number {
    return this.userSockets.size;
  }
}

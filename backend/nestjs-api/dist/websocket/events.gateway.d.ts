import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private userSockets;
    private roomUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(client: Socket, data: {
        room: string;
    }): void;
    handleLeaveRoom(client: Socket, data: {
        room: string;
    }): void;
    handleChatMessage(client: Socket, data: {
        room: string;
        content: string;
        senderName: string;
    }): void;
    handleTyping(client: Socket, data: {
        room: string;
        isTyping: boolean;
    }): void;
    handleDirectMessage(client: Socket, data: {
        receiverId: string;
        content: string;
        senderName: string;
    }): void;
    handleNotification(client: Socket, data: {
        targetUserId: string;
        type: string;
        message: string;
    }): void;
    handleJoinUserRoom(client: Socket, data: {
        userId: string;
    }): void;
    handlePing(client: Socket): void;
    broadcastToRoom(room: string, event: string, data: unknown): void;
    sendToUser(userId: string, event: string, data: unknown): void;
    private getOnlineCount;
}

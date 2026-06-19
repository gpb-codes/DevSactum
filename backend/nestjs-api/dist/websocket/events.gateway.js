"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let EventsGateway = class EventsGateway {
    constructor() {
        this.userSockets = new Map();
        this.roomUsers = new Map();
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId || 'anonymous';
        client.data.userId = userId;
        if (!this.userSockets.has(userId)) {
            this.userSockets.set(userId, new Set());
        }
        this.userSockets.get(userId).add(client.id);
        console.log(`[WS] Client connected: ${client.id} (user: ${userId})`);
        client.emit('connected', { clientId: client.id, userId });
        this.server.emit('online_count', this.getOnlineCount());
    }
    handleDisconnect(client) {
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
    handleJoinRoom(client, data) {
        const userId = client.data.userId;
        client.join(data.room);
        if (!this.roomUsers.has(data.room)) {
            this.roomUsers.set(data.room, new Set());
        }
        this.roomUsers.get(data.room).add(userId);
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
    handleLeaveRoom(client, data) {
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
    handleChatMessage(client, data) {
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
    handleTyping(client, data) {
        const userId = client.data.userId;
        client.to(data.room).emit('typing', {
            userId,
            room: data.room,
            isTyping: data.isTyping,
        });
    }
    handleDirectMessage(client, data) {
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
    handleNotification(client, data) {
        this.server.to(`user:${data.targetUserId}`).emit('notification', {
            type: data.type,
            message: data.message,
            timestamp: Date.now(),
        });
    }
    handleJoinUserRoom(client, data) {
        client.join(`user:${data.userId}`);
    }
    handlePing(client) {
        client.emit('pong');
    }
    broadcastToRoom(room, event, data) {
        this.server.to(room).emit(event, data);
    }
    sendToUser(userId, event, data) {
        this.server.to(`user:${userId}`).emit(event, data);
    }
    getOnlineCount() {
        return this.userSockets.size;
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_room'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave_room'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat_message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleChatMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('direct_message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleDirectMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('notification'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleNotification", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join_user_room'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleJoinUserRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('ping'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handlePing", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
        namespace: '/',
    })
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map
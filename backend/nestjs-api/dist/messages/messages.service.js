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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./message.entity");
let MessagesService = class MessagesService {
    constructor(messagesRepository) {
        this.messagesRepository = messagesRepository;
    }
    async send(senderId, data) {
        if (!data.receiverId && !data.communityId) {
            throw new common_1.BadRequestException('receiver_id or community_id required');
        }
        const message = this.messagesRepository.create({
            ...data,
            senderId,
        });
        return this.messagesRepository.save(message);
    }
    async getDirectMessages(userId1, userId2, limit = 50, offset = 0) {
        const query = this.messagesRepository.createQueryBuilder('msg');
        query.where('(msg.sender_id = :userId1 AND msg.receiver_id = :userId2) OR (msg.sender_id = :userId2 AND msg.receiver_id = :userId1)', { userId1, userId2 });
        query.orderBy('msg.created_at', 'DESC');
        query.take(limit);
        query.skip(offset);
        query.leftJoinAndSelect('msg.sender', 'sender');
        query.leftJoinAndSelect('msg.receiver', 'receiver');
        return query.getMany();
    }
    async getCommunityMessages(communityId, limit = 50, offset = 0) {
        return this.messagesRepository.find({
            where: { communityId },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
            relations: ['sender'],
        });
    }
    async getUnreadCount(userId) {
        return this.messagesRepository.count({
            where: { receiverId: userId, isRead: false },
        });
    }
    async markAsRead(id) {
        await this.messagesRepository.update(id, { isRead: true });
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map
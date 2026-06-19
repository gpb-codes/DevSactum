import { Repository } from 'typeorm';
import { Message } from './message.entity';
export declare class MessagesService {
    private messagesRepository;
    constructor(messagesRepository: Repository<Message>);
    send(senderId: string, data: Partial<Message>): Promise<Message>;
    getDirectMessages(userId1: string, userId2: string, limit?: number, offset?: number): Promise<Message[]>;
    getCommunityMessages(communityId: string, limit?: number, offset?: number): Promise<Message[]>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(id: string): Promise<void>;
}

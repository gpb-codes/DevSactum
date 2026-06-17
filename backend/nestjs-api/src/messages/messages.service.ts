import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async send(senderId: string, data: Partial<Message>): Promise<Message> {
    if (!data.receiverId && !data.communityId) {
      throw new BadRequestException('receiver_id or community_id required');
    }

    const message = this.messagesRepository.create({
      ...data,
      senderId,
    });
    return this.messagesRepository.save(message);
  }

  async getDirectMessages(userId1: string, userId2: string, limit = 50, offset = 0): Promise<Message[]> {
    const query = this.messagesRepository.createQueryBuilder('msg');
    query.where(
      '(msg.sender_id = :userId1 AND msg.receiver_id = :userId2) OR (msg.sender_id = :userId2 AND msg.receiver_id = :userId1)',
      { userId1, userId2 },
    );
    query.orderBy('msg.created_at', 'DESC');
    query.take(limit);
    query.skip(offset);
    query.leftJoinAndSelect('msg.sender', 'sender');
    query.leftJoinAndSelect('msg.receiver', 'receiver');
    return query.getMany();
  }

  async getCommunityMessages(communityId: string, limit = 50, offset = 0): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { communityId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['sender'],
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.messagesRepository.count({
      where: { receiverId: userId, isRead: false },
    });
  }

  async markAsRead(id: string): Promise<void> {
    await this.messagesRepository.update(id, { isRead: true });
  }
}

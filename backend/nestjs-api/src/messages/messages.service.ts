import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, LessThan } from 'typeorm'
import { Message } from './entities/message.entity'

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async send(data: { content: string; senderId: string; receiverId?: string; communityId?: string }) {
    const message = this.messageRepo.create(data)
    await this.messageRepo.save(message)
    return { message }
  }

  async getDirect(userId1: string, userId2: string, limit = 50, offset = 0) {
    const messages = await this.messageRepo.find({
      where: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    })
    return { messages: messages.reverse() }
  }

  async getCommunity(communityId: string, limit = 50, offset = 0) {
    const messages = await this.messageRepo.find({
      where: { communityId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    })
    return { messages: messages.reverse() }
  }

  async getUnreadCount(userId: string) {
    const count = await this.messageRepo.count({
      where: { receiverId: userId, isRead: false },
    })
    return { unread_count: count }
  }

  async markAsRead(messageId: string) {
    await this.messageRepo.update(messageId, { isRead: true })
  }
}

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Notification } from './entities/notification.entity'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notifRepo: Repository<Notification>,
  ) {}

  async create(data: { userId: string; actorId: string; type: string; content?: string }) {
    const notif = this.notifRepo.create(data)
    await this.notifRepo.save(notif)
    return notif
  }

  async findByUser(userId: string, limit = 20, offset = 0) {
    const [notifications, total] = await this.notifRepo.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    })
    return { notifications, total }
  }

  async markAsRead(id: string) {
    await this.notifRepo.update(id, { read: true })
  }

  async markAllAsRead(userId: string) {
    await this.notifRepo.update({ userId, read: false }, { read: true })
  }

  async getUnreadCount(userId: string) {
    return this.notifRepo.count({ where: { userId, read: false } })
  }
}

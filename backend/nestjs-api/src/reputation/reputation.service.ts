import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile, ReputationEvent } from './profile.entity';

@Injectable()
export class ReputationService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(ReputationEvent)
    private eventsRepository: Repository<ReputationEvent>,
  ) {}

  async getUserReputation(userId: string): Promise<number> {
    const result = await this.eventsRepository
      .createQueryBuilder('event')
      .select('COALESCE(SUM(event.points), 0)', 'total')
      .where('event.user_id = :userId', { userId })
      .getRawOne();
    return parseInt(result.total, 10);
  }

  async getHistory(userId: string, limit = 20): Promise<ReputationEvent[]> {
    return this.eventsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getLeaderboard(limit = 10): Promise<Profile[]> {
    return this.profilesRepository.find({
      order: { reputationScore: 'DESC' },
      take: limit,
      relations: ['user'],
    });
  }

  async addEvent(userId: string, points: number, reason: string): Promise<ReputationEvent> {
    const event = this.eventsRepository.create({ userId, points, reason });
    await this.eventsRepository.save(event);

    await this.profilesRepository
      .createQueryBuilder()
      .update(Profile)
      .set({ reputationScore: () => `reputation_score + ${points}` })
      .where('user_id = :userId', { userId })
      .execute();

    return event;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ReputationProfile, ReputationEvent } from './entities/reputation.entity'

@Injectable()
export class ReputationService {
  constructor(
    @InjectRepository(ReputationProfile)
    private readonly profileRepo: Repository<ReputationProfile>,
    @InjectRepository(ReputationEvent)
    private readonly eventRepo: Repository<ReputationEvent>,
  ) {}

  async getProfile(userId: string) {
    let profile = await this.profileRepo.findOne({ where: { userId } })
    if (!profile) {
      profile = this.profileRepo.create({ userId })
      await this.profileRepo.save(profile)
    }
    return { profile }
  }

  async getHistory(userId: string) {
    const events = await this.eventRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 50,
    })
    return { events }
  }

  async getLeaderboard(limit = 20) {
    const profiles = await this.profileRepo.find({
      order: { reputationScore: 'DESC' },
      take: limit,
    })
    const leaderboard = profiles.map(p => ({
      userId: p.userId,
      score: p.reputationScore,
      level: p.level,
    }))
    return { leaderboard }
  }
}

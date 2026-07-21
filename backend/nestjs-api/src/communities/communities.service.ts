import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Community, CommunityMember } from './entities/community.entity'

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepo: Repository<Community>,
    @InjectRepository(CommunityMember)
    private readonly memberRepo: Repository<CommunityMember>,
  ) {}

  async findAll(limit = 20, offset = 0) {
    const [communities, total] = await this.communityRepo.findAndCount({
      order: { membersCount: 'DESC' },
      take: limit,
      skip: offset,
    })
    return { communities, total }
  }

  async findOne(id: string) {
    const community = await this.communityRepo.findOne({ where: { id } })
    if (!community) throw new NotFoundException('Community not found')
    return { community }
  }

  async create(data: { name: string; description?: string }, userId: string) {
    const existing = await this.communityRepo.findOne({ where: { name: data.name } })
    if (existing) throw new ConflictException('Community name already exists')

    const community = this.communityRepo.create({
      ...data,
      creatorId: userId,
      icon: data.name.slice(0, 2).toUpperCase(),
    })
    await this.communityRepo.save(community)

    await this.memberRepo.save({ communityId: community.id, userId })
    community.membersCount = 1
    await this.communityRepo.save(community)

    return { community }
  }

  async join(id: string, userId: string) {
    const existing = await this.memberRepo.findOne({
      where: { communityId: id, userId },
    })
    if (existing) throw new ConflictException('Already a member')

    await this.memberRepo.save({ communityId: id, userId })
    await this.communityRepo.increment({ id }, 'membersCount', 1)
    return { success: true }
  }

  async leave(id: string, userId: string) {
    const result = await this.memberRepo.delete({ communityId: id, userId })
    if (result.affected === 0) throw new NotFoundException('Not a member')
    await this.communityRepo.decrement({ id }, 'membersCount', 1)
    return { success: true }
  }

  async delete(id: string) {
    const result = await this.communityRepo.delete(id)
    if (result.affected === 0) throw new NotFoundException('Community not found')
  }
}

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Community, CommunityMember } from './community.entity';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communitiesRepository: Repository<Community>,
    @InjectRepository(CommunityMember)
    private membersRepository: Repository<CommunityMember>,
  ) {}

  async create(data: Partial<Community>, userId: string): Promise<Community> {
    const existing = await this.communitiesRepository.findOne({ where: { name: data.name } });
    if (existing) {
      throw new ConflictException('Community name already taken');
    }

    const community = this.communitiesRepository.create(data);
    const saved = await this.communitiesRepository.save(community);

    await this.membersRepository.save({
      communityId: saved.id,
      userId,
      role: 'admin',
    });

    saved.memberCount = 1;
    await this.communitiesRepository.save(saved);

    return saved;
  }

  async findById(id: string): Promise<Community> {
    const community = await this.communitiesRepository.findOne({ where: { id } });
    if (!community) {
      throw new NotFoundException('Community not found');
    }
    return community;
  }

  async findAll(limit = 20, offset = 0): Promise<Community[]> {
    return this.communitiesRepository.find({
      order: { memberCount: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async join(communityId: string, userId: string): Promise<void> {
    const existing = await this.membersRepository.findOne({
      where: { communityId, userId },
    });
    if (existing) {
      throw new ConflictException('Already a member');
    }

    await this.membersRepository.save({ communityId, userId, role: 'member' });

    const community = await this.findById(communityId);
    community.memberCount += 1;
    await this.communitiesRepository.save(community);
  }

  async leave(communityId: string, userId: string): Promise<void> {
    const member = await this.membersRepository.findOne({
      where: { communityId, userId },
    });
    if (member) {
      await this.membersRepository.remove(member);

      const community = await this.findById(communityId);
      community.memberCount = Math.max(0, community.memberCount - 1);
      await this.communitiesRepository.save(community);
    }
  }

  async isMember(communityId: string, userId: string): Promise<boolean> {
    const member = await this.membersRepository.findOne({
      where: { communityId, userId },
    });
    return !!member;
  }

  async delete(id: string): Promise<void> {
    const community = await this.findById(id);
    await this.communitiesRepository.remove(community);
  }
}

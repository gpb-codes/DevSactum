import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Post } from '../posts/entities/post.entity'
import { Community } from '../communities/entities/community.entity'
import { ReputationProfile } from '../reputation/entities/reputation.entity'

@Injectable()
export class ExploreService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(Community)
    private readonly communityRepo: Repository<Community>,
    @InjectRepository(ReputationProfile)
    private readonly profileRepo: Repository<ReputationProfile>,
  ) {}

  async getTrending(limit = 10) {
    const posts = await this.postRepo.find({
      order: { likesCount: 'DESC', createdAt: 'DESC' },
      take: limit,
    })
    return { posts }
  }

  async getFeed(limit = 20, offset = 0) {
    const [posts, total] = await this.postRepo.findAndCount({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    })
    return { posts, total }
  }

  async getTrendingCommunities(limit = 10) {
    const communities = await this.communityRepo.find({
      order: { membersCount: 'DESC' },
      take: limit,
    })
    return { communities }
  }

  async getTopDevelopers(limit = 10) {
    const profiles = await this.profileRepo.find({
      order: { reputationScore: 'DESC' },
      take: limit,
    })
    return { developers: profiles }
  }

  async getExploreData() {
    const [posts, communities, developers] = await Promise.all([
      this.postRepo.find({ order: { likesCount: 'DESC' }, take: 5 }),
      this.communityRepo.find({ order: { membersCount: 'DESC' }, take: 10 }),
      this.profileRepo.find({ order: { reputationScore: 'DESC' }, take: 5 }),
    ])

    return {
      trendingPosts: posts,
      trendingCommunities: communities,
      topDevelopers: developers,
    }
  }
}

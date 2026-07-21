import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm'
import { User } from '../../auth/entities/user.entity'

@Entity('communities')
export class Community {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ nullable: true })
  icon?: string

  @Column({ name: 'members_count', default: 0 })
  membersCount: number

  @Column({ name: 'online_count', default: 0 })
  onlineCount: number

  @Column({ name: 'creator_id' })
  creatorId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

@Entity('community_members')
export class CommunityMember {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'community_id' })
  communityId: string

  @Column({ name: 'user_id' })
  userId: string

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date
}

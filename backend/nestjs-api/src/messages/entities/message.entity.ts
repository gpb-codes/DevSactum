import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm'
import { User } from '../../auth/entities/user.entity'

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  content: string

  @Column({ name: 'sender_id' })
  senderId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User

  @Column({ name: 'receiver_id', nullable: true })
  receiverId?: string

  @Column({ name: 'community_id', nullable: true })
  communityId?: string

  @Column({ name: 'is_read', default: false })
  isRead: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

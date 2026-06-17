import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Community } from '../communities/community.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sender_id', type: 'uuid' })
  senderId: string;

  @Column({ name: 'receiver_id', type: 'uuid', nullable: true })
  receiverId: string;

  @Column({ name: 'community_id', type: 'uuid', nullable: true })
  communityId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @ManyToOne(() => Community, community => community.id)
  @JoinColumn({ name: 'community_id' })
  community: Community;
}

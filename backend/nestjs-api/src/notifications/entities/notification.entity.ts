import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm'

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'actor_id' })
  actorId: string

  @Column()
  type: string

  @Column({ type: 'text', nullable: true })
  content?: string

  @Column({ default: false })
  read: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

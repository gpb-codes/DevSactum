import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm'

@Entity('reputation_profiles')
export class ReputationProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'reputation_score', default: 0 })
  reputationScore: number

  @Column({ default: 'junior' })
  level: string

  @Column({ nullable: true })
  stack?: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  bio?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

@Entity('reputation_events')
export class ReputationEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'event_type' })
  eventType: string

  @Column({ default: 0 })
  points: number

  @Column({ type: 'text', nullable: true })
  description?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

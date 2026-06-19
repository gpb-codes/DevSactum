import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ length: 50 })
  plan: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @Column({ name: 'paypal_subscription_id', type: 'text', nullable: true })
  paypalSubscriptionId: string;

  @Column()
  amount: number;

  @Column({ length: 10, default: 'USD' })
  currency: string;

  @Column({ name: 'billing_cycle', length: 20, default: 'monthly' })
  billingCycle: string;

  @CreateDateColumn({ name: 'started_at' })
  startedAt: Date;

  @Column({ name: 'expires_at', type: 'datetime', nullable: true })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm'

@Entity('payment_orders')
export class PaymentOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'plan_id' })
  planId: string

  @Column({ name: 'plan_name' })
  planName: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number

  @Column({ default: 'USD' })
  currency: string

  @Column({ default: 'pending' })
  status: string

  @Column({ name: 'payment_method', default: 'paypal' })
  paymentMethod: string

  @Column({ name: 'paypal_order_id', nullable: true })
  paypalOrderId?: string

  @Column({ name: 'paypal_payer_id', nullable: true })
  paypalPayerId?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'plan_id' })
  planId: string

  @Column({ name: 'plan_name' })
  planName: string

  @Column({ default: 'active' })
  status: string

  @Column({ name: 'current_period_start' })
  currentPeriodStart: Date

  @Column({ name: 'current_period_end' })
  currentPeriodEnd: Date

  @Column({ name: 'cancel_at', nullable: true })
  cancelAt?: Date

  @Column({ name: 'payment_method', default: 'paypal' })
  paymentMethod: string
}

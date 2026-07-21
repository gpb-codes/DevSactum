import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username: string

  @Column({ name: 'display_name' })
  displayName: string

  @Column({ select: false })
  password: string

  @Column({ default: 'developer' })
  role: string

  @Column({ name: 'company_name', nullable: true })
  companyName?: string

  @Column({ name: 'is_premium', default: false })
  isPremium: boolean

  @Column({ nullable: true })
  bio?: string

  @Column({ nullable: true })
  avatar?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

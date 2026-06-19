import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('freelance_projects')
export class FreelanceProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'budget_min', nullable: true })
  budgetMin: number;

  @Column({ name: 'budget_max', nullable: true })
  budgetMax: number;

  @Column({ length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'date', nullable: true })
  deadline: string;

  @Column({
    type: 'text',
    default: '{}',
    transformer: {
      to: (value: string[]) => Array.isArray(value) ? value.join(',') : (value || ''),
      from: (value: string) => {
        if (Array.isArray(value)) return value;
        if (!value || value === '{}') return [];
        return value.split(',').map(s => s.trim()).filter(Boolean);
      },
    },
  })
  skills: string[];

  @Column({ length: 20, default: 'open' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'client_id' })
  client: User;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { FreelanceProject } from './freelance-project.entity';

@Entity('freelance_bids')
@Unique(['projectId', 'developerId'])
export class FreelanceBid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'project_id', type: 'uuid' })
  projectId: string;

  @Column({ name: 'developer_id', type: 'uuid' })
  developerId: string;

  @Column()
  amount: number;

  @Column({ type: 'text', nullable: true })
  proposal: string;

  @Column({ name: 'estimated_days', nullable: true })
  estimatedDays: number;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => FreelanceProject, project => project.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: FreelanceProject;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'developer_id' })
  developer: User;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from '../users/user.entity';
import { Job } from './job.entity';

@Entity('job_applications')
@Unique(['jobId', 'developerId'])
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'job_id', type: 'uuid' })
  jobId: string;

  @Column({ name: 'developer_id', type: 'uuid' })
  developerId: string;

  @Column({ length: 20, default: 'pending' })
  status: string;

  @Column({ name: 'cover_letter', type: 'text', nullable: true })
  coverLetter: string;

  @Column({ name: 'portfolio_url', type: 'text', nullable: true })
  portfolioUrl: string;

  @CreateDateColumn({ name: 'applied_at' })
  appliedAt: Date;

  @ManyToOne(() => Job, job => job.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'developer_id' })
  developer: User;
}

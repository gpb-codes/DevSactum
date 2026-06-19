import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 200, nullable: true })
  location: string;

  @Column({ default: false })
  remote: boolean;

  @Column({ name: 'job_type', length: 20, default: 'full-time' })
  jobType: string;

  @Column({ name: 'experience_level', length: 20, default: 'mid' })
  experienceLevel: string;

  @Column({ name: 'salary_min', nullable: true })
  salaryMin: number;

  @Column({ name: 'salary_max', nullable: true })
  salaryMax: number;

  @Column({ length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'text', nullable: true })
  description: string;

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
  requirements: string[];

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
  benefits: string[];

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
  tags: string[];

  @Column({ name: 'applicants_count', default: 0 })
  applicantsCount: number;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ name: 'is_urgent', default: false })
  isUrgent: boolean;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'company_id' })
  company: User;
}

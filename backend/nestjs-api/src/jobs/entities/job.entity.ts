import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm'

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ name: 'company_name' })
  companyName: string

  @Column({ type: 'text' })
  description: string

  @Column({ nullable: true })
  location?: string

  @Column({ default: false })
  remote: boolean

  @Column({ nullable: true })
  type?: string

  @Column({ name: 'experience_level', nullable: true })
  experienceLevel?: string

  @Column({ name: 'salary_min', nullable: true, type: 'decimal', precision: 10, scale: 2 })
  salaryMin?: number

  @Column({ name: 'salary_max', nullable: true, type: 'decimal', precision: 10, scale: 2 })
  salaryMax?: number

  @Column({ nullable: true })
  currency?: string

  @Column({ type: 'simple-array', nullable: true })
  skills?: string[]

  @Column({ name: 'created_by' })
  createdBy: string

  @Column({ default: 0 })
  applicants: number

  @CreateDateColumn({ name: 'posted_at' })
  postedAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

@Entity('job_applications')
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'job_id' })
  jobId: string

  @Column({ name: 'user_id' })
  userId: string

  @Column({ name: 'cover_letter', type: 'text', nullable: true })
  coverLetter?: string

  @Column({ nullable: true })
  portfolio?: string

  @Column({ default: 'pending' })
  status: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

@Entity('job_bookmarks')
export class JobBookmark {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'job_id' })
  jobId: string

  @ManyToOne(() => Job, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'job_id' })
  job: Job

  @Column({ name: 'user_id' })
  userId: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

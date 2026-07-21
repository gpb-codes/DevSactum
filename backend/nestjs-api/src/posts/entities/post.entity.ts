import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm'
import { User } from '../../auth/entities/user.entity'

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  content: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ nullable: true })
  tags?: string

  @Column({ name: 'code_snippet', nullable: true, type: 'text' })
  codeSnippet?: string

  @Column({ name: 'code_language', nullable: true })
  codeLanguage?: string

  @Column({ name: 'likes_count', default: 0 })
  likesCount: number

  @Column({ name: 'comments_count', default: 0 })
  commentsCount: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}

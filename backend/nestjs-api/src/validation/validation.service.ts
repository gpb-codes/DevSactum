import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Validation } from './validation.entity';

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(Validation)
    private repo: Repository<Validation>,
  ) {}

  async findByUser(userId: string): Promise<Validation[]> {
    return this.repo.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Validation> {
    const v = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!v) throw new NotFoundException('Validation not found');
    return v;
  }

  async create(data: Partial<Validation>): Promise<Validation> {
    const v = this.repo.create(data);
    return this.repo.save(v);
  }

  async complete(id: string, score: number): Promise<Validation> {
    const v = await this.findById(id);
    v.score = score;
    v.status = 'completed';
    v.completedAt = new Date();
    return this.repo.save(v);
  }

  async delete(id: string): Promise<void> {
    const v = await this.findById(id);
    await this.repo.remove(v);
  }
}

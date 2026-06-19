import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private repo: Repository<Portfolio>,
  ) {}

  async findByUser(userId: string): Promise<Portfolio[]> {
    return this.repo.find({ where: { userId }, order: { isFeatured: 'DESC', createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<Portfolio> {
    const item = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!item) throw new NotFoundException('Portfolio item not found');
    return item;
  }

  async create(data: Partial<Portfolio>): Promise<Portfolio> {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  async update(id: string, data: Partial<Portfolio>): Promise<Portfolio> {
    const item = await this.findById(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async delete(id: string): Promise<void> {
    const item = await this.findById(id);
    await this.repo.remove(item);
  }
}

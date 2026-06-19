import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validation } from './validation.entity';
import { ValidationService } from './validation.service';
import { ValidationController } from './validation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Validation])],
  controllers: [ValidationController],
  providers: [ValidationService],
  exports: [ValidationService],
})
export class ValidationModule {}

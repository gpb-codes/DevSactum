import { IsString, IsOptional, IsBoolean, IsNumber, IsArray } from 'class-validator'

export class CreateJobDto {
  @IsString()
  title: string

  @IsString()
  companyName: string

  @IsString()
  description: string

  @IsOptional()
  @IsString()
  location?: string

  @IsOptional()
  @IsBoolean()
  remote?: boolean

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsString()
  experienceLevel?: string

  @IsOptional()
  @IsNumber()
  salaryMin?: number

  @IsOptional()
  @IsNumber()
  salaryMax?: number

  @IsOptional()
  @IsString()
  currency?: string

  @IsOptional()
  @IsArray()
  skills?: string[]
}

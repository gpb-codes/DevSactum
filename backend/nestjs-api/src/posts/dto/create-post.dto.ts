import { IsString, IsOptional, MaxLength } from 'class-validator'

export class CreatePostDto {
  @IsString()
  @MaxLength(5000)
  content: string

  @IsOptional()
  @IsString()
  tags?: string

  @IsOptional()
  @IsString()
  code_snippet?: string

  @IsOptional()
  @IsString()
  code_language?: string
}

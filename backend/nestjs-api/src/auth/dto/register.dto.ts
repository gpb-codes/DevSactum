import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(3)
  username: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  displayName: string

  @IsOptional()
  @IsIn(['developer', 'company'])
  role?: string

  @IsOptional()
  @IsString()
  companyName?: string
}

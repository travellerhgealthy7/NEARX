import { IsEmail, IsOptional, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  readonly firstName!: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @ValidateIf((dto: CreateUserDto) => !dto.phoneNumber)
  @IsString()
  @IsEmail()
  readonly email?: string;

  @ValidateIf((dto: CreateUserDto) => !dto.email)
  @IsString()
  @MinLength(10)
  readonly phoneNumber?: string;

  @IsString()
  @MinLength(6)
  readonly password!: string;
}

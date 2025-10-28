import { IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly phoneNumber?: string;

  @IsString()
  @MinLength(6)
  readonly password!: string;
}

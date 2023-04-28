import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @IsOptional()
  department: string;

  @IsString()
  @IsOptional()
  team: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsOptional()
  role: number;

  @IsOptional()
  @IsArray()
  roles: number[];
}

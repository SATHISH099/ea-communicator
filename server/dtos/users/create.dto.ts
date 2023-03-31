import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class RoleDto {
  id: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsOptional()
  @IsNumber()
  userId: number;

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
  roles: RoleDto[];
}

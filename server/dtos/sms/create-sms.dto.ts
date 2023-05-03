import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';

class CreateSmsRecipientDto {
  recipientId: number;
}

class CreateSmsGroupDto {
  groupId: number;
}

export class CreateSmsDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  message: string;

  @IsString()
  sender: string;

  @IsEnum(ImportanceLevel)
  importanceLevel: ImportanceLevel;

  @IsBoolean()
  isPredefined: boolean;

  @IsOptional()
  @IsArray()
  recipients: CreateSmsRecipientDto[];

  @IsOptional()
  @IsArray()
  groups: CreateSmsGroupDto[];
}

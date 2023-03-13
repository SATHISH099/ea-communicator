import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';
import { MediaDto } from '../media/media.dto';

class CreateMessageRecipientDto {
  recipientId: number;
}

class CreateMessageGroupDto {
  groupId: number;
}

export class CreateMessageDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  message: string;

  @IsBoolean()
  isPredefined: boolean;

  @IsBoolean()
  isSms: boolean;

  @IsBoolean()
  isVoice: boolean;

  @IsBoolean()
  isEmail: boolean;

  @IsEnum(ImportanceLevel)
  importanceLevel: ImportanceLevel;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDto)
  medias: MediaDto[];

  @IsOptional()
  @IsArray()
  recipients: CreateMessageRecipientDto[];

  @IsOptional()
  @IsArray()
  groups: CreateMessageGroupDto[];
}

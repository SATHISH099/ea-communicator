import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { MediaDto } from '../media/media.dto';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';

export class EmailRecipientDto {
  to: number[];
  cc: number[];
  bcc: number[];
}

export class EmailGroupDto {
  to: number[];
  cc: number[];
  bcc: number[];
}

export class CreateEmailDto {
  @IsString()
  @MaxLength(255)
  subject: string;

  @IsNotEmpty()
  body: string;

  @IsInt()
  sender: number;

  @IsEnum(ImportanceLevel)
  importanceLevel: ImportanceLevel;

  @IsBoolean()
  isPredefined: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDto)
  medias: MediaDto[];

  @IsOptional()
  recipients: EmailRecipientDto;

  @IsOptional()
  groups: EmailGroupDto;
}

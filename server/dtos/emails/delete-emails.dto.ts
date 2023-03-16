import { IsArray } from 'class-validator';
import { Email } from '~~/server/database/entities/emails/email.entity';
import { Exists } from '~~/server/decorator/exists.decorator';

export class DeleteEmailDto {
  @IsArray()
  @Exists(
    {
      entity: Email,
      column: 'id',
    },
    {
      message: 'Email id not exist.',
    },
  )
  ids: number[];
}

import { IsNotEmpty } from 'class-validator';
import { IsOfMimeType } from '~~/server/decorator/mime-type-validate.decorator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsOfMimeType({
    type: [
      'image/png',
      'image/jpeg',
      'image/webp',
      'imagesvg+xml',
      'image/svg+xml',
      'application/pdf',
      'application/msword',
      'video/mp4',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword',
      'application/vnd.ms-word.document.macroEnabled.12',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      'text/csv',
    ],
    isMultiple: true,
  })
  media: Buffer;
}

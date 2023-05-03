import { Media } from '~~/server/database/entities/media/media.entity';
import { Exists } from '~~/server/decorator/exists.decorator';

export class MediaDto {
  @Exists({
    entity: Media,
    column: 'id',
  })
  id: number;
}

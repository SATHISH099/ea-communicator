import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { CreateMediaDto } from '~~/server/dtos/media/create-media.dto';
import { MediaService } from '~~/server/services/media.service';
import { UserService } from '~~/server/services/user.service';

interface FileAttr {
  extension: string;
  data: Buffer;
  name: string;
  type: string;
  size?: number;
}

export default defineEventHandler(async (event) => {
  const data = await parseRequestFormData(event);

  await validationPipe(CreateMediaDto, data);

  const service = new MediaService();
  const user = new UserService();
  const medias = await Promise.all(
    data.media.map(async (file: FileAttr) => {
      const uniqueSuffix = randomUUID();
      const fileName = `${uniqueSuffix}.${file.extension}`;
      const filePath = `uploads/${fileName}`;
      const fileUrl = `/medias/uploads/${fileName}`;
      await fs.writeFile(join(process.dev ? '' : '..', filePath), file.data);

      return service.create({
        title: file.name,
        extension: file.extension,
        mimeType: file.type,
        size: file.size || 0,
        fileUrl,
        filePath,
        tenantId: (await user.getLoginUser()).tenantId,
      });
    }),
  );

  return medias;
});

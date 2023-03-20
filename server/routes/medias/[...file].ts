import { join } from 'node:path';
import { createReadStream } from 'node:fs';

export default defineEventHandler((event) => {
  const pathParam = event.context.params!.file;
  const filePath = join(process.dev ? '' : '..', pathParam);

  const fileStream = createReadStream(filePath);

  return sendStream(event, fileStream);
});

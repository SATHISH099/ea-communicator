import { UpdateUserDto } from '~~/server/dtos/users/update.dto';
import { UserService } from '~~/server/services/user.service';
import { verifySmartSuiteRequest } from '~~/server/utils/common';

export default defineEventHandler(async (event) => {
  await verifySmartSuiteRequest(event);

  const service = new UserService();
  const { id } = getQuery(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Incomplete data',
    });
  }

  const requestBody = await readBody(event);
  await validationPipe(UpdateUserDto, requestBody);

  return service.update(id as number, {
    ...requestBody,
  });
});

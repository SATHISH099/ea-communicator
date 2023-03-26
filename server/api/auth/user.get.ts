import { UserService } from '~~/server/services/user.service';
import { verifySmartSuiteRequest } from '~~/server/utils/common';

export default defineEventHandler(async (event) => {
  const { data } = await verifySmartSuiteRequest(event);

  const service = new UserService();
  const { id } = getQuery(event);

  if (data?.id) {
    return service.findOne(id as number, {
      relations: ['roles'],
    });
  }

  throw createError({
    statusCode: 400,
    message: 'Incomplete data',
  });
});

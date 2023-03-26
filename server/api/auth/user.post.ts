import { CreateUserDto } from '~~/server/dtos/users/create.dto';
import { UserService } from '~~/server/services/user.service';
import { verifySmartSuiteRequest } from '~~/server/utils/common';

export default defineEventHandler(async (event) => {
  const service = new UserService();
  const requestBody = await readBody(event);
  await validationPipe(CreateUserDto, requestBody);

  const { user } = await verifySmartSuiteRequest(event);

  return service.create({
    ...requestBody,
    tenantId: user.tenantId,
    creator: user,
  });
});

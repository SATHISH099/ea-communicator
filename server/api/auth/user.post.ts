import { CreateUserDto } from '~~/server/dtos/users/create.dto';
import { RoleService } from '~~/server/services/role.service';
import { UserService } from '~~/server/services/user.service';
import { verifySmartSuiteRequest } from '~~/server/utils/common';

export default defineEventHandler(async (event) => {
  const service = new UserService();
  const requestBody = await readBody(event);
  await validationPipe(CreateUserDto, requestBody);

  const { user } = await verifySmartSuiteRequest(event);

  if (requestBody.init) {
    const roleService = new RoleService();
    const roles = await roleService.createDefaultRoles(requestBody.tenantId);

    requestBody.roles = [roles[0].id];
  }

  return service.create({
    ...requestBody,
    creator: user,
  });
});

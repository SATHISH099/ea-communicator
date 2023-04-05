import { RoleService } from '~~/server/services/role.service';
import { UserService } from '~~/server/services/user.service';

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);
  await verifySmartSuiteRequest(event);

  const service = new RoleService();

  const roles = await service.findAll(
    {
      pageNumber: 1,
      pageSize: 10,
      orderBy: 'id',
      orderType: 'asc',
    },
    {
      select: ['id', 'slug', 'name'],
    },
  );

  if (!isNaN(userId as number)) {
    const user = await new UserService().findOne(undefined, {
      where: { userId: userId as number },
      relations: { roles: true },
    });

    return {
      total: roles.total,
      data: roles.data.map((role) => ({
        ...role,
        active: user.roles.some((ur) => ur.id === role.id),
      })),
    };
  }

  return roles;
});

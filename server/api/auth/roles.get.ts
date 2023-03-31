import { RoleService } from '~~/server/services/role.service';

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);
  const { user } = await verifySmartSuiteRequest(event);

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

  if (userId) {
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

import { RoleService } from '~~/server/services/role.service';

export default defineEventHandler(() => {
  const service = new RoleService();

  return service.findAll(
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
});

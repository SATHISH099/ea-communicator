import { z } from 'zod';
import { procedure, router } from '~/server/trpc/trpc';
import { DashboardService } from '~~/server/services/dashboard.service';

const counts = procedure
  .input(
    z.object({
      countType: z.enum(['models', 'dateRange']),
      startDate: z.any(),
      endDate: z.any(),
    }),
  )
  .query(({ input }) => {
    const dashboardService = new DashboardService();
    if (input.countType === 'models') {
      return dashboardService.getModelsCount(input);
    }

    return dashboardService.getDateRangeCount({
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
    });
  });

export const dashboard = router({
  counts,
});

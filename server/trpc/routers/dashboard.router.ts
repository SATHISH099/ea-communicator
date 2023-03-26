import { z } from 'zod';
import { authProcedure, router } from '~/server/trpc/trpc';
import { DashboardService } from '~~/server/services/dashboard.service';

const counts = authProcedure
  .input(
    z.object({
      countType: z.enum(['models', 'dateRange']),
      startDate: z.any(),
      endDate: z.any(),
    }),
  )
  .query(({ ctx, input }) => {
    const dashboardService = new DashboardService();
    dashboardService.setEvent(ctx);
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

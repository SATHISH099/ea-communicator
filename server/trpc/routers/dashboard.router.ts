import { z } from 'zod';
import { router, procedure } from '~/server/trpc/trpc';
import { DashboardService } from '~~/server/services/dashboard.service';

const modelsCounts = procedure.query(() => {
  const dashboardService = new DashboardService();
  return dashboardService.getModelsCount();
});

const dateRangCounts = procedure
  .input(
    z.object({
      startDate: z.date(),
      endDate: z.date(),
    }),
  )
  .query(({ input }) => {
    const dashboardService = new DashboardService();
    return dashboardService.getDateRangeCount(input);
  });

export const dashboard = router({
  modelsCounts,
  dateRangCounts,
});

import { procedure, router } from '~/server/trpc/trpc';
import { EmailService } from '~~/server/services/email.service';

export const email = router({
  list: procedure.query(() => {
    const emailService = new EmailService();

    return emailService.findAll();
  }),
});

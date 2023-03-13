import { Between } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { Email } from '../database/entities/emails/email.entity';
import { Media } from '../database/entities/media/media.entity';
import { Message } from '../database/entities/message/message.entity';
import { Sms } from '../database/entities/sms/sms.entity';
import { Voice } from '../database/entities/voice/voice.entity';
import { DateRangeCounterDto } from '../dtos/dashboard/date-range-counter.dto';
import { UserService } from './user.service';

export class DashboardService {
  constructor(private userService: UserService) {}

  async getModelsCount(req?) {
    const { tenantId } = await this.userService.getLoginUser();

    const emailCount = await appDataSource.getRepository(Email).count({
      where: {
        tenantId: tenantId,
        ...(req?.startDate && {
          createdAt: Between(
            req.startDate.toISOString(),
            req.endDate.toISOString(),
          ),
        }),
      },
    });

    const smsCount = await appDataSource.getRepository(Sms).count({
      where: {
        tenantId: tenantId,
        ...(req?.startDate && {
          createdAt: Between(
            req.startDate.toISOString(),
            req.endDate.toISOString(),
          ),
        }),
      },
    });

    const voiceCount = await appDataSource.getRepository(Voice).count({
      where: {
        tenantId: tenantId,
        ...(req?.startDate && {
          createdAt: Between(
            req.startDate.toISOString(),
            req.endDate.toISOString(),
          ),
        }),
      },
    });

    const messageCount = await appDataSource.getRepository(Message).count({
      where: {
        tenantId: tenantId,
        ...(req?.startDate && {
          createdAt: Between(
            req.startDate.toISOString(),
            req.endDate.toISOString(),
          ),
        }),
      },
    });

    const libraryCount = await appDataSource.getRepository(Media).count({
      where: {
        tenantId: tenantId,
        ...(req?.startDate && {
          createdAt: Between(
            req.startDate.toISOString(),
            req.endDate.toISOString(),
          ),
        }),
      },
    });

    return {
      emailCount,
      smsCount,
      voiceCount,
      messageCount,
      libraryCount,
    };
  }

  async getDateRangeCount(req: DateRangeCounterDto) {
    req.endDate.setUTCHours(23, 59, 59, 999);
    return this.getModelsCount(req);
  }
}

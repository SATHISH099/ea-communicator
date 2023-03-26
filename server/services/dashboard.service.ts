import { Between } from 'typeorm';
import appDataSource from '../database/config/app.datasource';
import { Email } from '../database/entities/emails/email.entity';
import { Media } from '../database/entities/media/media.entity';
import { Message } from '../database/entities/message/message.entity';
import { Sms } from '../database/entities/sms/sms.entity';
import { Voice } from '../database/entities/voice/voice.entity';
import type { DateRangeCounterDto } from '../dtos/dashboard/date-range-counter.dto';
import { BaseService } from './base.service';

export class DashboardService extends BaseService<Email> {
  async getModelsCount(req?: any) {
    const { tenantId } = await getCurrentUser(this.event);

    const emailCount = await appDataSource.getRepository(Email).count({
      where: {
        tenantId,
        isPredefined: false,
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
        tenantId,
        isPredefined: false,
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
        tenantId,
        isPredefined: false,
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
        tenantId,
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
        tenantId,
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

  getDateRangeCount(req: DateRangeCounterDto) {
    if (req.endDate) {
      req.endDate?.setUTCHours(23, 59, 59, 999);
    }

    return this.getModelsCount(req);
  }
}

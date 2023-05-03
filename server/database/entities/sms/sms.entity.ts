import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { User } from '../user/user.entity';
import { SmsRecipient } from './sms-recipients.entity';
import { SmsGroup } from './sms-groups.entity';
import type { SendingStatus } from '~~/server/enums/sending-status.enum';
import type { ImportanceLevel } from '~~/server/enums/importance-level.enum';

@Entity('sms')
export class Sms extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ name: 'sending_status', type: 'simple-enum' })
  sendingStatus: SendingStatus;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column({ name: 'importance_level', type: 'simple-enum', default: 'low' })
  importanceLevel: ImportanceLevel;

  @Column({ default: true, name: 'is_predefined', type: 'boolean' })
  isPredefined: boolean;

  @Column({ name: 'tenant_id', type: 'integer' })
  tenantId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(() => SmsRecipient, (smsRecipient) => smsRecipient.smsId)
  @JoinTable({
    name: 'sms_recipients',
    joinColumn: { name: 'sms_id', referencedColumnName: 'id' },
  })
  recipients: SmsRecipient[];

  @OneToMany(() => SmsGroup, (smsGroup) => smsGroup.smsId)
  @JoinTable({
    name: 'sms_groups',
    joinColumn: { name: 'sms_id', referencedColumnName: 'id' },
  })
  groups: SmsGroup[];
}

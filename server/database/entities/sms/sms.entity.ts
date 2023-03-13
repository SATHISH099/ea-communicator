import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { SmsRecipient } from './sms-recipients.entity';
import { SmsGroup } from './sms-groups.entity';
import { BaseEntity } from '../../base.entity';
import { SendingStatus } from '~~/server/enums/sending-status.enum';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';
import { User } from '../user/user.entity';

@Entity('sms')
export class Sms extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ name: 'sending_status', type: 'simple-enum' })
  sendingStatus: SendingStatus;

  @Column({ type: 'varchar' })
  sender: string;

  @Column({ name: 'importance_level', type: 'simple-enum', default: 'low' })
  importanceLevel: ImportanceLevel;

  @Column({ default: true, name: 'is_predefined' })
  isPredefined: boolean;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creatorId: User;

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

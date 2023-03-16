import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sms } from './sms.entity';

@Entity('sms_groups')
export class SmsGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sms, (sms) => sms.id)
  @JoinColumn({ name: 'sms_id' })
  smsId: number;

  @Column({ type: 'integer', name: 'group_id' })
  groupId: number;
}

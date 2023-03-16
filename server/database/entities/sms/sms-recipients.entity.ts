import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sms } from './sms.entity';

@Entity('sms_recipients')
export class SmsRecipient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sms, (sms) => sms.id)
  @JoinColumn({ name: 'sms_id' })
  smsId: number;

  @Column({ type: 'integer', name: 'recipient_id' })
  recipientId: number;
}

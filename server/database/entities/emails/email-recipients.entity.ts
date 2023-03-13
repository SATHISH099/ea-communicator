import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Email } from './email.entity';

@Entity('email_recipients')
export class EmailRecipient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Email, (email) => email.id)
  @JoinColumn({ name: 'email_id' })
  emailId: number;

  @Column({ type: 'integer', name: 'recipient_id' })
  recipientId: number;

  @Column({ type: 'varchar', name: 'recipient_type' })
  recipientType: string;
}

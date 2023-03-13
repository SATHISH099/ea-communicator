import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Email } from './email.entity';

@Entity('email_groups')
export class EmailGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Email, (email) => email.id)
  @JoinColumn({ name: 'email_id' })
  emailId: number;

  @Column({ type: 'integer', name: 'group_id' })
  groupId: number;

  @Column({ type: 'varchar', name: 'group_type' })
  groupType: string;
}

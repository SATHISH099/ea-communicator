import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity('message_groups')
export class MessageGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Message, (message) => message.id)
  @JoinColumn({ name: 'message_id' })
  messageId: number;

  @Column({ type: 'integer', name: 'group_id' })
  groupId: number;
}

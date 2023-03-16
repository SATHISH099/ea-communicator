import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { BaseEntity } from '../../base.entity';
import { User } from '../user/user.entity';
import { Media } from '../media/media.entity';
import { MessageRecipient } from './message-recipients.entity';
import { MessageGroup } from './message-groups.entity';
import type { SendingStatus } from '~~/server/enums/sending-status.enum';
import type { ImportanceLevel } from '~~/server/enums/importance-level.enum';

@Entity('messages')
export class Message extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column({ name: 'sending_status', type: 'simple-enum' })
  sendingStatus: SendingStatus;

  @Column({ name: 'importance_level', type: 'simple-enum', default: 'low' })
  importanceLevel: ImportanceLevel;

  @Column({ default: 0, name: 'is_predefined', type: 'boolean' })
  isPredefined: boolean;

  @Column({ default: 0, name: 'is_sms', type: 'boolean' })
  isSms: boolean;

  @Column({ default: 0, name: 'is_voice', type: 'boolean' })
  isVoice: boolean;

  @Column({ default: 0, name: 'is_email', type: 'boolean' })
  isEmail: boolean;

  @Column({ name: 'tenant_id', type: 'varchar' })
  tenantId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creatorId: User;

  @ManyToMany(() => Media, (medias) => medias.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'message_attachments',
    joinColumn: { name: 'message_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_id', referencedColumnName: 'id' },
  })
  medias: Media[];

  @OneToMany(
    () => MessageRecipient,
    (messageRecipient) => messageRecipient.messageId,
  )
  @JoinTable({
    name: 'message_recipients',
    joinColumn: { name: 'email_id', referencedColumnName: 'id' },
  })
  recipients: MessageRecipient[];

  @OneToMany(() => MessageGroup, (messageGroup) => messageGroup.messageId)
  @JoinTable({
    name: 'message_groups',
    joinColumn: { name: 'email_id', referencedColumnName: 'id' },
  })
  groups: MessageGroup[];
}

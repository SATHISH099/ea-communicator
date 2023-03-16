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
import { Media } from '../media/media.entity';
import { User } from '../user/user.entity';
import { EmailRecipient } from './email-recipients.entity';
import { EmailGroup } from './email-groups.entity';
import type { SendingStatus } from '~~/server/enums/sending-status.enum';
import type { ImportanceLevel } from '~~/server/enums/importance-level.enum';

@Entity('emails')
export class Email extends BaseEntity {
  @Column({ type: 'varchar' })
  subject: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column({ name: 'sending_status', type: 'simple-enum' })
  sendingStatus: SendingStatus;

  @Column({ name: 'importance_level', type: 'simple-enum', default: 'low' })
  importanceLevel: ImportanceLevel;

  @Column({ default: false, name: 'is_predefined', type: 'boolean' })
  isPredefined: boolean;

  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({ name: 'tenant_id', type: 'integer' })
  tenantId: number;

  @ManyToMany(() => Media, (medias) => medias.emails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'email_attachments',
    joinColumn: { name: 'email_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_id', referencedColumnName: 'id' },
  })
  medias: Media[];

  @OneToMany(() => EmailRecipient, (emailRecipient) => emailRecipient.emailId)
  @JoinTable({
    name: 'email_recipients',
    joinColumn: { name: 'email_id', referencedColumnName: 'id' },
  })
  recipients: EmailRecipient[];

  @OneToMany(() => EmailGroup, (emailGroup) => emailGroup.emailId)
  @JoinTable({
    name: 'email_groups',
    joinColumn: { name: 'email_id', referencedColumnName: 'id' },
  })
  groups: EmailGroup[];
}

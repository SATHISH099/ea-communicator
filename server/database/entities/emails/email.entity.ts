import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EmailRecipient } from './email-recipients.entity';
import { EmailGroup } from './email-groups.entity';
import { BaseEntity } from '../../base.entity';
import { SendingStatus } from '~~/server/enums/sending-status.enum';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';
import { User } from '../user/user.entity';
import { Media } from '../media/media.entity';

@Entity('emails')
export class Email extends BaseEntity {
  @Column({ type: 'varchar' })
  subject: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar' })
  sender: string;

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
  creatorId: User;

  @Column({ name: 'tenant_id', type: 'varchar' })
  tenantId: string;

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

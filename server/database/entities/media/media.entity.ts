import { Entity, Column, AfterLoad, ManyToMany } from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from '../../base.entity';
import { Email } from '../emails/email.entity';
import { Message } from '../message/message.entity';

@Entity('attachments')
export class Media extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', name: 'file_url' })
  fileUrl: string;

  @Column({ name: 'mime_type', type: 'varchar' })
  mimeType: string;

  @Column({ type: 'integer' })
  size: number;

  @Column({ nullable: true, type: 'varchar' })
  extension: string;

  @Column({ type: 'varchar', name: 'tenant_id', nullable: true })
  tenantId: string;

  @AfterLoad()
  updateImageUrl() {
    const appUrl: string = process.env.APP_URL;
    this.fileUrl = `${appUrl}${this.fileUrl}`;
  }

  @IsOptional()
  @ManyToMany(() => Email, (emails) => emails.medias, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  emails: Email[];

  @IsOptional()
  @ManyToMany(() => Message, (messages) => messages.medias, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  messages: Message[];
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';
import { BaseEntity } from '../../base.entity';
import { User } from '../user/user.entity';

@Entity('voices')
export class Voice extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ name: 'importance_level', type: 'simple-enum', default: 'low' })
  importanceLevel: ImportanceLevel;

  @Column({ default: 0, name: 'is_predefined', type: 'boolean' })
  isPredefined: boolean;

  @Column({ name: 'tenant_id', type: 'varchar' })
  tenantId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creatorId: User;
}

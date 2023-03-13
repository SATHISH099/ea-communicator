import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from '../../base.entity';
import { Role } from '../role/role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'integer', name: 'user_id' })
  userId: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'varchar', nullable: true, name: 'tenant_id' })
  tenantId: string;

  @Column({ type: 'varchar', nullable: true })
  department: string;

  @Column({ type: 'varchar', nullable: true })
  team: string;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @ManyToOne(() => User)
  @IsOptional()
  @JoinColumn({ name: 'creator_id' })
  creatorId: number;

  @ManyToMany(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}

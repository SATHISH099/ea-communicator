import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from '../../base.entity';
import { Role } from '../role/role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true, name: 'tenant_id' })
  tenantId: string;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true })
  team: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => User)
  @IsOptional()
  @JoinColumn({ name: 'creator_id' })
  creatorId: User;

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

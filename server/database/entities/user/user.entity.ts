import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from '../../base.entity';
import { Role } from '../role/role.entity';
import { Token } from '../token/token.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'integer', name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'integer', nullable: true, name: 'tenant_id' })
  tenantId: number;

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

  @OneToMany(() => Token, (token) => token.user)
  token: Token;
}

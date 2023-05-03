import { IsOptional } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Role } from '../role/role.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ unique: true, type: 'varchar' })
  slug: string;

  @Column({ type: 'varchar' })
  @IsOptional()
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'permission_roles',
    joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}

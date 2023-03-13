import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../base.entity';
import { Permission } from '../permission/permission.entity';
import { User } from '../user/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, name: 'tenant_id' })
  tenantId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @ManyToMany(() => User, (users) => users.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  users: User[];

  @ManyToMany(() => Permission, (permissions) => permissions.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  permissions: Permission[];
}

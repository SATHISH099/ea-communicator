import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { User } from '../user/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, name: 'tenant_id' })
  tenantId: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

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

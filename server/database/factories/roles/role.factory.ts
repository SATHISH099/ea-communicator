import { define } from 'typeorm-seeding';
import { Role } from '../../entities/role/role.entity';
import { roleData } from './data';

define(Role, () => roleData());

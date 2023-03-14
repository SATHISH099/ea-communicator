import { define } from 'typeorm-seeding';
import { User } from '../../entities/user/user.entity';
import { userData } from './data';

define(User, () => userData());

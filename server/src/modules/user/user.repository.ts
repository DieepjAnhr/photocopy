import { BaseRepository } from 'src/common/base/base.repository';
import { User } from './entities/user.entity';
import { CustomRepository } from 'src/common/decorators/typeorm.decorator';

@CustomRepository(User)
export class UserRepository extends BaseRepository<User> {}

// import { ExtendedRepository } from 'src/common/graphql/customExtended';
import { CustomRepository } from 'src/common/decorators/typeorm.decorator';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends ExtendedRepository<User> {}

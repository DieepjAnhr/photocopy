import { BaseRepository } from '@/common/base/repository.base';
import { UserCreationAttributes } from '@/models/user.model';

export class UserRepository extends BaseRepository {
    async findById(user_id: number) {
        return await this.userModel.findOne({ where: { id: user_id } });
    }

    async create(data: UserCreationAttributes) {
        return await this.userModel.create(data);
    }
}

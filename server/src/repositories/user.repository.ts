import { BaseRepository } from '@/common/base/repository.base';
import { UserCreationAttributes } from '@/models/user.model';

export class RUser extends BaseRepository {
    async create(data: UserCreationAttributes) {
        return await this.User.create(data);
    }

    async findById(user_id: number) {
        return await this.User.findOne({ where: { id: user_id } });
    }
}

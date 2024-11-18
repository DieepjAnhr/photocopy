import { BaseRepository } from '@/common/base/repository.base';
import { RoleCreationAttributes } from '@/models/role.model';

export class RRole extends BaseRepository {
    async create(data: RoleCreationAttributes) {
        return await this.Role.create(data);
    }
}

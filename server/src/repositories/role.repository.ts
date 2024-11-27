import { BaseRepository } from '@/common/base/repository.base';
import { RoleCreationAttributes } from '@/models/role.model';

export class RoleRepository extends BaseRepository {
    async create(data: RoleCreationAttributes) {
        return await this.roleModel.create(data);
    }
}

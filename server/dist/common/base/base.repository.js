"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return await this.model.findAll();
    }
    async findById(id) {
        return await this.model.findOne({ where: { id } });
    }
    async create(data) {
        return await this.model.create(data);
    }
    async update(id, data) {
        return await this.model.update(data, { where: { id } });
    }
    async delete(id) {
        return await this.model.update({ is_deleted: true }, { where: { id } });
    }
    async hardDelete(id) {
        return await this.model.destroy({ where: { id } });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map
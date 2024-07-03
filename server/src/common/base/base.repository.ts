import { Model, ModelCtor } from "sequelize-typescript";

export class BaseRepository<T extends Model> {
    protected model: ModelCtor<T>;

    constructor(model: ModelCtor<T>) {
        this.model = model;
    }

    async findAll(): Promise<T[]> {
        return await this.model.findAll();
    }

    async findById(id: number): Promise<T | null> {
        return await this.model.findOne({ where: { id } as any });
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data as any);
    }

    async update(id: number, data: Partial<T>): Promise<[number]> {
        return await this.model.update(data as any, { where: { id } as any });
    }

    async delete(id: number): Promise<[number]> {
        return await this.model.update({ is_deleted: true }, { where: { id } as any });
    }

    async hardDelete(id: number): Promise<number> {
        return await this.model.destroy({ where: { id } as any });
    }
}
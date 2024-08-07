import { BaseRepository } from "@/common/base/base.repository";
import { MCategory } from "@/models/category.model";
import { ModelCtor } from "sequelize-typescript";

export class RCategory extends BaseRepository<MCategory> {
    constructor(model: ModelCtor<MCategory>) {
        super(model)
    }
}
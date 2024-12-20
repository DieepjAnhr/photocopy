import { FindOptionsWhere, Repository } from "typeorm";
import { GetManyQuery } from "../shared/types/orm.type";

export abstract class AbstractRepository<T = unknown> extends Repository<T> {
    private _getCondition(): FindOptionsWhere<T> | FindOptionsWhere<T>[] {
        return {}
    }

    async getOne() { }

    async getMany(args: GetManyQuery<T>, responseType: 'all' | 'data' | 'count') {

    }
}
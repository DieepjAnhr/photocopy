import { RCategory } from "@/repositories/category.repository"

interface IProps {
    category: RCategory
}

export class SCategory {
    private rCategory: RCategory

    setDependency ({
        category
    }: IProps) {
        this.rCategory = category
    }

    async get(id: number) {
        return await this.rCategory.findById(id)
    }
}
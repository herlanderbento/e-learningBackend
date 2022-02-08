import { getRepository, Repository } from "typeorm";
import { ICategoryRepository } from "@modules/courses/repositories/ICategoryRepository";
import { Category } from "../entities/Category";

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create(name: string): Promise<void> {
    const category = this.repository.create({
      name,
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findOne({ name });
  }
}

export { CategoryRepository };

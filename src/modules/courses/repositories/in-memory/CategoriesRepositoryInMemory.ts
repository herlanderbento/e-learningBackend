import { Category } from "@modules/courses/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private repository: Category[];

  constructor() {
    this.repository = [];
  }

  async create(name: string): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.repository.push(category);
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.find((category) => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.repository;
  }
}

export { CategoriesRepositoryInMemory };

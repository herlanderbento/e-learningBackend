import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
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

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }
}

export { CategoriesRepository };

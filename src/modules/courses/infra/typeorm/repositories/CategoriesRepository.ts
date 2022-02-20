import { ICreateCategoriesDtos } from "@modules/courses/dtos/ICreateCategoriesDtos";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({
    id,
    name,
    description,
  }: ICreateCategoriesDtos): Promise<void> {
    const category = this.repository.create({
      name,
      description,
      id,
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findOne({ name });
  }

  async findById(id: string): Promise<Category> {
    return await this.repository.findOne({ id });
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}

export { CategoriesRepository };

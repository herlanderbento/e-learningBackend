import { Category } from "../infra/typeorm/entities/Category";

interface ICategoryRepository {
  create(name: string): Promise<void>;
  findByName(name: string): Promise<Category>;
}

export { ICategoryRepository };

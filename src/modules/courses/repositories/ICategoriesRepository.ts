import { Category } from "../infra/typeorm/entities/Category";

interface ICategoriesRepository {
  create(name: string): Promise<void>;
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository };

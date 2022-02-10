import { CategoriesRepository } from "@modules/courses/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

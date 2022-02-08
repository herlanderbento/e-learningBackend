import { container } from "tsyringe";

import { ICategoryRepository } from "@modules/courses/repositories/ICategoryRepository";
import { CategoryRepository } from "@modules/courses/infra/typeorm/repositories/CategoryRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

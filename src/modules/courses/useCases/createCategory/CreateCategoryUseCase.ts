import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(name: string): Promise<void> {
    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new AppError("Category already exists!");
    }

    await this.categoriesRepository.create(name);
  }
}

export { CreateCategoryUseCase };

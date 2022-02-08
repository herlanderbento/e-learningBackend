import { ICategoryRepository } from "@modules/courses/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(name: string): Promise<void> {
    const category = await this.categoryRepository.findByName(name);

    if (category) {
      throw new AppError("Category already exists!");
    }

    await this.categoryRepository.create(name);
  }
}

export { CreateCategoryUseCase };

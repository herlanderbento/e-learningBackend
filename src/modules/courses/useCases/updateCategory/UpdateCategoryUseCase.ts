import { ICreateCategoriesDtos } from "@modules/courses/dtos/ICreateCategoriesDtos";
import { Category } from "@modules/courses/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import * as Yup from "yup";

@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    id,
    name,
    description,
  }: ICreateCategoriesDtos): Promise<Category> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid({ name }))) {
      throw new AppError("Validation fails");
    }

    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found!");
    }

    if (name !== category.name) {
      const category = await this.categoriesRepository.findByName(name);

      if (category) {
        throw new AppError("Category already exists!");
      }
    }

    Object.assign(category, {
      name,
      description,
      updated_at: new Date(),
    });

    await this.categoriesRepository.create({ id, name, description });

    return category;
  }
}

export { UpdateCategoryUseCase };

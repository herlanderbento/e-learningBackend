import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

import * as Yup from "yup";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      // description: Yup.string().required(),
    });

    if (!(await schema.isValid({ name, description }))) {
      throw new AppError("Validation fails");
    }

    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new AppError("Category already exists!");
    }

    await this.categoriesRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };

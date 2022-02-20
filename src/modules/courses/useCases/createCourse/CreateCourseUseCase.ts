import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import * as Yup from "yup";

interface IRequest {
  name: string;
  description: string;
  category_id: string;
  // user_id?: string;
}

@injectable()
class CreateCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute({
    name,
    description,
    category_id,
  }: // user_id,
  IRequest): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      category_id: Yup.string().required(),
    });

    if (!(await schema.isValid({ name, category_id }))) {
      throw new AppError("Validation fails");
    }

    const course = await this.coursesRepository.findByName(name);

    if (course) {
      throw new AppError("Course already exists!");
    }

    await this.coursesRepository.create({
      name,
      description,
      category_id,
      // user_id,
    });
  }
}

export { CreateCourseUseCase };

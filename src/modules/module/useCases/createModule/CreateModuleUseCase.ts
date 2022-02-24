import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { Module } from "@modules/module/infra/entities/Module";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import * as Yup from "yup";

interface IRequest {
  name: string;
  description: string;
  duration: number;
  course_id: string;
}

@injectable()
class CreateModuleUseCase {
  constructor(
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute({
    name,
    description,
    duration,
    course_id,
  }: IRequest): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      duration: Yup.string().required(),
      course_id: Yup.string().required(),
    });

    if (!(await schema.isValid({ name, course_id, duration }))) {
      throw new AppError("Validation fails");
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError("Course does not exists!");
    }

    const modules = await this.modulesRepository.findByName(name);

    if (modules) {
      throw new AppError("Modules already exists!");
    }

    await this.modulesRepository.create({
      name,
      description,
      duration,
      course_id,
    });
  }
}

export { CreateModuleUseCase };

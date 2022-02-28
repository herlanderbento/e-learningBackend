import { inject, injectable } from "tsyringe";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";

import * as Yup from "yup";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  name: string;
  description: string;
  duration: number;
  image?: string;
  course_id: string;
}

@injectable()
class CreateModuleUseCase {
  constructor(
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    name,
    description,
    duration,
    image,
    course_id,
  }: IRequest): Promise<void> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      duration: Yup.string().required(),
      image: Yup.string().required(),
      course_id: Yup.string().required(),
    });

    if (!(await schema.isValid({ name, course_id, duration, image }))) {
      throw new AppError("Validation fails");
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      await this.storageProvider.save(image, "");
      throw new AppError("Course does not exists!");
    }

    const modules = await this.modulesRepository.findByName(name);

    if (modules) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Modules already exists!");
    }

    await this.storageProvider.save(image, "courses");

    await this.modulesRepository.create({
      name,
      description,
      duration,
      image,
      course_id,
    });
  }
}

export { CreateModuleUseCase };

import { ICreateLessonDTO } from "@modules/lessons/dtos/ICreateLessonDTO";
import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import * as Yup from "yup";

interface IRequest {
  title: string;
  video: string;
  module_id: string;
}

@injectable()
class CreateLessonUseCase {
  constructor(
    @inject("LessonsRepository")
    private lessonsRepository: ILessonsRepository,
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ title, video, module_id }: IRequest): Promise<void> {
    // const schema = Yup.object().shape({
    //   title: Yup.string().required(),
    //   video: Yup.string().required(),
    //   module_id: Yup.string().required(),
    // });

    // if (!(await schema.isValid({ title, video, module_id }))) {
    //   throw new AppError("Validation fails2");
    // }

    const modules = await this.modulesRepository.findById(module_id);

    if (!modules) {
      await this.storageProvider.delete(video, "");

      throw new AppError("Module does not exists!");
    }

    const lesson = await this.lessonsRepository.findByTitle(title);

    if (lesson) {
      await this.storageProvider.delete(video, "");

      throw new AppError("Lesson already exists!");
    }

    await this.storageProvider.save(video, "lessons");

    await this.lessonsRepository.create({
      title,
      video,
      module_id,
    });
  }
}

export { CreateLessonUseCase };

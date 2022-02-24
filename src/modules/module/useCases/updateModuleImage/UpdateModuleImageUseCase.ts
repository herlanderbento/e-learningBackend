import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { AppError } from "@shared/errors/AppError";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  image: string;
}

@injectable()
class UpdateModuleImageUseCase {
  constructor(
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository
  ) {}

  async execute({ id, image }: IRequest): Promise<void> {
    const updateImage = await this.modulesRepository.findById(id);

    if (!updateImage) {
      throw new AppError("Module does not exists!");
    }

    if (updateImage.image) {
      await deleteFile(`./tmp/moduleImages/${updateImage.image}`);
    }

    updateImage.image = image;

    await this.modulesRepository.save(updateImage);
  }
}

export { UpdateModuleImageUseCase };

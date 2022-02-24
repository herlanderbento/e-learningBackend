import { inject, injectable } from "tsyringe";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteModuleUseCase {
  constructor(
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const deleteModule = await this.modulesRepository.findById(id);

    if (!deleteModule) {
      throw new AppError("Module does not exists!");
    }

    await this.modulesRepository.delete(id);
  }
}

export { DeleteModuleUseCase };

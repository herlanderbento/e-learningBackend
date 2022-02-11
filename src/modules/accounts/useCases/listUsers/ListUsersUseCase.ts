import { User } from "@modules/accounts/infra/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(): Promise<User[]> {
    const list = await this.usersRepository.listAllUsers();

    return list;
  }
}

export { ListUsersUseCase };

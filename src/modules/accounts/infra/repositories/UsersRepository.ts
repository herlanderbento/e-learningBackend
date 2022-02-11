import { ICreateUsersDto } from "@modules/accounts/dtos/ICreateUsersDto";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUsersDto): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ id });
  }

  async listAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }
}

export { UsersRepository };

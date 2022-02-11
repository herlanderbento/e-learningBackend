import { ICreateUsersDto } from "../dtos/ICreateUsersDto";
import { User } from "../infra/entities/User";

interface IUsersRepository {
  create(data: ICreateUsersDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  listAllUsers(): Promise<User[]>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };

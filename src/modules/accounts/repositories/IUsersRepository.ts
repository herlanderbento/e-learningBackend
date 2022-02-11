import { ICreateUsersDto } from "../dtos/ICreateUsersDto";
import { User } from "../infra/entities/User";

interface IUsersRepository {
  create(data: ICreateUsersDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByBI(bi: string): Promise<User>;
  save(user: User): Promise<User>;
}

export { IUsersRepository };

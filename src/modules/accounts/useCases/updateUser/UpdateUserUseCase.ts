import { inject, injectable } from "tsyringe";
import * as Yup from "yup";

import { User } from "@modules/accounts/infra/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  bi: string;
  phone: string;
  county: string;
  city: string;
  province: string;
  country: string;
  id: string;
}
@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    name,
    bi,
    phone,
    county,
    city,
    province,
    country,
    id,
  }: IRequest): Promise<User> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid({ name }))) {
      throw new AppError("Validation fails");
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found!");
    }

    if (bi !== user.bi) {
      const biAlreadyExists = await this.usersRepository.findByBI(bi);

      if (biAlreadyExists) {
        throw new AppError("Identity card already exists.");
      }
    }

    Object.assign(user, {
      name,
      bi,
      phone,
      county,
      city,
      province,
      country,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserUseCase };

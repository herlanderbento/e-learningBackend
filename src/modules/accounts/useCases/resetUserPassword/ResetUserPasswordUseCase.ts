import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import * as Yup from "yup";

interface IRequest {
  id: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    oldPassword,
    password,
    confirmPassword,
  }: IRequest): Promise<void> {
    const schema = Yup.object().shape({
      oldPassword: Yup.string().min(6).required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string().when(
        "password",
        (password: string, field: any) =>
          password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid({ oldPassword, password, confirmPassword }))) {
      throw new AppError("Validation fails");
    }

    if (password === oldPassword) {
      throw new AppError("Password should be different from old password!");
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    if (oldPassword && !(await compare(oldPassword, user.password))) {
      throw new AppError("Password does not match");
    }

    const passwordHash = await hash(password, 8);

    Object.assign(user, {
      password: passwordHash,
      updated_at: new Date(),
    });

    await this.usersRepository.save(user);
  }
}

export { ResetUserPasswordUseCase };

import { inject, injectable } from "tsyringe";
import { Address } from "@modules/accounts/infra/entities/Address";
import { AppError } from "@shared/errors/AppError";
import * as Yup from "yup";
import { ICreateUserAddressDto } from "@modules/accounts/dtos/ICreateUserAddressDto";
import { IUserAddressRepository } from "@modules/accounts/repositories/IUserAddressRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserAddressUseCase {
  constructor(
    @inject("UserAddressRepository")
    private userAddressRepository: IUserAddressRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    bi,
    phone,
    district,
    city,
    province,
    country,
    user_id,
  }: ICreateUserAddressDto): Promise<Address> {
    const schema = Yup.object().shape({
      user_id: Yup.string().required(),
    });

    if (!(await schema.isValid({ user_id }))) {
      throw new AppError("Validation fails");
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found!");
    }

    const biAlreadyExists = await this.userAddressRepository.findByBI(bi);

    if (biAlreadyExists) {
      throw new AppError("Identity card already exists!");
    }

    const address = this.userAddressRepository.create({
      bi,
      phone,
      district,
      city,
      province,
      country,
      user_id,
    });

    return address;
  }
}

export { CreateUserAddressUseCase };

import { ICreateUserAddressDto } from "@modules/accounts/dtos/ICreateUserAddressDto";
import { IUserAddressRepository } from "@modules/accounts/repositories/IUserAddressRepository";
import { getRepository, Repository } from "typeorm";
import { Address } from "../entities/Address";

class UserAddressRepository implements IUserAddressRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = getRepository(Address);
  }

  async create({
    bi,
    phone,
    district,
    city,
    province,
    country,
    user_id,
  }: ICreateUserAddressDto): Promise<Address> {
    const address = this.repository.create({
      bi,
      phone,
      district,
      city,
      province,
      country,
      user_id,
    });

    await this.repository.save(address);

    return address;
  }

  async findById(id: string): Promise<Address> {
    return await this.repository.findOne({ id });
  }

  async findByBI(bi: string): Promise<Address> {
    return await this.repository.findOne({ bi });
  }

  async save(address: Address): Promise<Address> {
    return await this.repository.save(address);
  }
}

export { UserAddressRepository };

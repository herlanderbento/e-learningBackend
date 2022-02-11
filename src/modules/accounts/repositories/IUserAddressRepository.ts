import { ICreateUserAddressDto } from "../dtos/ICreateUserAddressDto";
import { Address } from "../infra/entities/Address";

interface IUserAddressRepository {
  create(data: ICreateUserAddressDto): Promise<Address>;
  findByBI(bi: string): Promise<Address>;
  findById(id: string): Promise<Address>;
  save(address: Address): Promise<Address>;
}

export { IUserAddressRepository };

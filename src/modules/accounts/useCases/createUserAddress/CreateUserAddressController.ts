import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserAddressUseCase } from "./CreateUserAddressUseCase";

class CreateUserAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { bi, phone, district, city, province, country, user_id } =
      request.body;

    const createUserAddressUseCase = container.resolve(
      CreateUserAddressUseCase
    );

    const address = await createUserAddressUseCase.execute({
      bi,
      phone,
      district,
      city,
      province,
      country,
      user_id,
    });

    return response.status(201).json(address);
  }
}

export { CreateUserAddressController };

import { container } from "tsyringe";

import { UserAddressRepository } from "@modules/accounts/infra/repositories/UserAddressRepository";
import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { IUserAddressRepository } from "@modules/accounts/repositories/IUserAddressRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/courses/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserAddressRepository>(
  "UserAddressRepository",
  UserAddressRepository
);

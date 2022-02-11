import { CreateUserAddressController } from "@modules/accounts/useCases/createUserAddress/CreateUserAddressController";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { Router } from "express";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const createUserAddressController = new CreateUserAddressController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/address", createUserAddressController.handle);

usersRoutes.get("/", listUsersController.handle);

export { usersRoutes };

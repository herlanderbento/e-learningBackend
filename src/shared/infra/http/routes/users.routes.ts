import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { Router } from "express";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();

usersRoutes.get("/", listUsersController.handle);
usersRoutes.post("/", createUserController.handle);

usersRoutes.put("/:id", updateUserController.handle);

export { usersRoutes };

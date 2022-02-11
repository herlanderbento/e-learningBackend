import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/accounts/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.get("/", listUsersController.handle);
usersRoutes.post("/", createUserController.handle);

usersRoutes.put("/:id", updateUserController.handle);
usersRoutes.delete("/:id", deleteUserController.handle);

export { usersRoutes };

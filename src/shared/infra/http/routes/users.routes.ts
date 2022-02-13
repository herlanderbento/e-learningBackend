import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/accounts/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { UserProfileController } from "@modules/accounts/useCases/userProfile/UserProfileController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const resetUserPasswordController = new ResetUserPasswordController();
const userProfileController = new UserProfileController();

usersRoutes.get("/", ensureAuthenticated, listUsersController.handle);
usersRoutes.get(
  "/profile/:id",
  ensureAuthenticated,
  userProfileController.handle
);

usersRoutes.post("/", createUserController.handle);

usersRoutes.put("/:id", ensureAuthenticated, updateUserController.handle);
usersRoutes.put(
  "/resetPassword/:id",
  ensureAuthenticated,
  resetUserPasswordController.handle
);
usersRoutes.delete("/:id", ensureAuthenticated, deleteUserController.handle);

usersRoutes.patch(
  "/:id",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };

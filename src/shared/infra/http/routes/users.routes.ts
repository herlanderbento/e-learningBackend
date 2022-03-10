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
import { MeController } from "@modules/accounts/useCases/me/MeController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { SearchUserController } from "@modules/accounts/useCases/searchUser/SearchUserController";
import { PaginatedUserController } from "@modules/accounts/useCases/paginatedUser/PaginatedUserController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const resetUserPasswordController = new ResetUserPasswordController();
const profileUserController = new ProfileUserController();
const meController = new MeController();
const searchUserController = new SearchUserController();
const paginatedUserController = new PaginatedUserController();

usersRoutes.get("/", listUsersController.handle);
usersRoutes.get("/search", searchUserController.handle);
usersRoutes.get("/paginated", paginatedUserController.handle);
usersRoutes.get("/me", ensureAuthenticated, meController.handle);
usersRoutes.get(
  "/profile/:id",
  ensureAuthenticated,
  profileUserController.handle
);

usersRoutes.post("/", createUserController.handle);

usersRoutes.put("/:id", ensureAuthenticated, updateUserController.handle);
usersRoutes.patch(
  "/resetPassword",
  ensureAuthenticated,
  resetUserPasswordController.handle
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.delete("/:id", ensureAuthenticated, deleteUserController.handle);

export { usersRoutes };

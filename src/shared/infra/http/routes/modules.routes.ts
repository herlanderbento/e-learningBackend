import { Router } from "express";

import multer from "multer";
import uploadConfig from "@config/upload";

import { CreateModuleController } from "@modules/module/useCases/createModule/CreateModuleController";
import { ListModulesController } from "@modules/module/useCases/listModules/ListModulesController";
import { UpdateModuleImageController } from "@modules/module/useCases/updateModuleImage/UpdateModuleImageController";

const modulesRoutes = Router();

const uploadImages = multer(uploadConfig.upload("./tmp/moduleImages"));

const createModuleController = new CreateModuleController();
const listModulesController = new ListModulesController();
const updateModuleImageController = new UpdateModuleImageController();

modulesRoutes.get("/", listModulesController.handle);
modulesRoutes.post(
  "/",
  uploadImages.single("image"),
  createModuleController.handle
);

modulesRoutes.patch(
  "/image/:id",
  uploadImages.single("image"),
  updateModuleImageController.handle
);

export { modulesRoutes };

import { CreateModuleController } from "@modules/module/useCases/createModule/CreateModuleController";
import { ListModulesController } from "@modules/module/useCases/listModules/ListModulesController";
import { Router } from "express";

const modulesRoutes = Router();

const createModuleController = new CreateModuleController();
const listModulesController = new ListModulesController();

modulesRoutes.get("/", listModulesController.handle);
modulesRoutes.post("/", createModuleController.handle);

export { modulesRoutes };

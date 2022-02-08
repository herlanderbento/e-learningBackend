import { CreateCategoryController } from "@modules/courses/useCases/createCategory/CreateCategoryController";
import { Router } from "express";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

export { categoriesRoutes };

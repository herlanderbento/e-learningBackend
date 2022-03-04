import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { coursesRoutes } from "./courses.routes";
import { lessonsRoutes } from "./lessons.routes";
import { modulesRoutes } from "./modules.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use("/courses", coursesRoutes);
router.use("/modules", modulesRoutes);
router.use("/lessons", lessonsRoutes);
router.use(authenticateRoutes);

export { router };

import { Router } from "express";

import { CreateCourseController } from "@modules/courses/useCases/createCourse/CreateCourseController";
import { ListCoursesController } from "@modules/courses/useCases/listCourses/ListCoursesController";
import { UpdateCourseController } from "@modules/courses/useCases/updateCourses/UpdateCourseController";
import { DeleteCourseController } from "@modules/courses/useCases/deleteCourse/DeleteCourseController";

const coursesRoutes = Router();

const createCourseController = new CreateCourseController();
const listCoursesController = new ListCoursesController();
const updateCourseController = new UpdateCourseController();
const deleteCourseController = new DeleteCourseController();

coursesRoutes.get("/", listCoursesController.handle);
coursesRoutes.post("/", createCourseController.handle);
coursesRoutes.put("/:id", updateCourseController.handle);
coursesRoutes.delete("/:id", deleteCourseController.handle);

export { coursesRoutes };

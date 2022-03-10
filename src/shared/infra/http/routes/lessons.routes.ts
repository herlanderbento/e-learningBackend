import { Router } from "express";

import multer from "multer";
import uploadConfig from "@config/upload";

import { CreateLessonController } from "@modules/lessons/useCases/createLesson/CreateLessonController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListLessonsController } from "@modules/lessons/useCases/listLessons/ListLessonsController";
import { UpdateLessonController } from "@modules/lessons/useCases/updateLesson/UpdateLessonController";
import { DeleteLessonController } from "@modules/lessons/useCases/deleteLesson/DeleteLessonController";
import { UpdateVideoLessonController } from "@modules/lessons/useCases/updateVideoLesson/UpdateVideoLessonController";
import { PaginatedLessonController } from "@modules/lessons/useCases/paginatedLesson/PaginatedLessonController";

const lessonsRoutes = Router();

const uploadVideos = multer(uploadConfig);

const createLessonController = new CreateLessonController();
const listsLessonsController = new ListLessonsController();
const updateLessonController = new UpdateLessonController();
const deleteLessonController = new DeleteLessonController();
const updateVideoLessonController = new UpdateVideoLessonController();
const paginatedLessonController = new PaginatedLessonController();

lessonsRoutes.get("/", ensureAuthenticated, listsLessonsController.handle);
lessonsRoutes.get("/paginated", paginatedLessonController.handle);
lessonsRoutes.post(
  "/",
  ensureAuthenticated,
  uploadVideos.single("video"),
  createLessonController.handle
);

lessonsRoutes.put("/:id", ensureAuthenticated, updateLessonController.handle);
lessonsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteLessonController.handle
);

lessonsRoutes.patch(
  "/:id",
  ensureAuthenticated,
  uploadVideos.single("video"),
  updateVideoLessonController.handle
);

export { lessonsRoutes };

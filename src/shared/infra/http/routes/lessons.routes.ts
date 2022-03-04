import { Router } from "express";

import multer from "multer";
import uploadConfig from "@config/upload";

import { CreateLessonController } from "@modules/lessons/useCases/createLesson/CreateLessonController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const lessonsRoutes = Router();

const uploadVideos = multer(uploadConfig);

const createLessonController = new CreateLessonController();

lessonsRoutes.post(
  "/",
  ensureAuthenticated,
  uploadVideos.single("video"),
  createLessonController.handle
);

export { lessonsRoutes };

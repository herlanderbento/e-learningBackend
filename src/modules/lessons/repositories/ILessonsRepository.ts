import { ICreateLessonDTO } from "../dtos/ICreateLessonDTO";
import { Lesson } from "../infra/entities/Lesson";

interface ILessonsRepository {
  create(data: ICreateLessonDTO): Promise<void>;
  findByTitle(title: string): Promise<Lesson>;
  findById(id: string): Promise<Lesson>;
  findAll(): Promise<Lesson[]>;
  delete(id: string): Promise<void>;
}

export { ILessonsRepository };

import { inject, injectable } from "tsyringe";
import { ICourseUsersRepository } from "@modules/courses/repositories/ICourseUsersRepository";

import * as Yup from "yup";
import { AppError } from "@shared/errors/AppError";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { CourseUser } from "@modules/courses/infra/typeorm/entities/CourseUser";

interface IRequest {
  user_id: string;
  course_id: string;
}

@injectable()
class CreateCourseUsersUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("CourseUsersRepository")
    private courseUsersRepository: ICourseUsersRepository
  ) {}
  async execute({ user_id, course_id }: IRequest): Promise<CourseUser> {
    const schema = Yup.object().shape({
      user_id: Yup.string().required(),
      course_id: Yup.string().required(),
    });

    if (!(await schema.isValid({ user_id, course_id }))) {
      throw new AppError("Validation fails");
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) throw new AppError("Course does not exists!");

    const create = await this.courseUsersRepository.create({
      user_id,
      course_id,
    });

    return create;
  }
}

export { CreateCourseUsersUseCase };

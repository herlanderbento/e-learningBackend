import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

class ResetUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { oldPassword, password, confirmPassword } = request.body;

    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase
    );

    await resetUserPasswordUseCase.execute({
      id,
      oldPassword,
      password,
      confirmPassword,
    });

    return response
      .status(200)
      .send({ message: "Password reset successfully" });
  }
}

export { ResetUserPasswordController };

import { CategoryRepositoryInMemory } from "@modules/courses/repositories/in-memory/CategoryRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
    };

    await createCategoryUseCase.execute(category.name);

    const categoryCreated = await categoryRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category Test",
    };

    await createCategoryUseCase.execute(category.name);

    await expect(createCategoryUseCase.execute(category.name)).rejects.toEqual(
      new AppError("Category already exists!")
    );
  });
});

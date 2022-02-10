import { CategoriesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
    };

    await createCategoryUseCase.execute(category.name);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
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

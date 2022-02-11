import { CategoriesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CategoriesRepositoryInMemory";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("List Categories", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to list all categories courses", async () => {
    const category = {
      name: "Category Test",
    };
    const createCategory = await categoriesRepositoryInMemory.create(
      category.name
    );

    const categories = await listCategoriesUseCase.execute();

    console.log(categories);

    expect(categories).toEqual(createCategory);
  });
});

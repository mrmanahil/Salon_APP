/* eslint-disable no-unsafe-finally */
import {
  CreateCategoryInput,
  Category,
  UpdateCategoryInput,
} from './category.model';
import CategoryService from './category.service';

class CategoryHandler {
  static getAll = async (): Promise<Category[]> => {
    return CategoryService.getAll();
  };

  static getByID = async (categoryID: number): Promise<Category | null> => {
    return CategoryService.getByID(categoryID);
  };

  static create = async (
    service: CreateCategoryInput
  ): Promise<Category | undefined> => {
    const validatedCategory = CreateCategoryInput.parse(service);

    if (validatedCategory) {
      const newService = await CategoryService.create({
        categoryName: validatedCategory.categoryName,
      });

      return newService;
    }

    return undefined;
  };

  static update = async (
    service: UpdateCategoryInput,
    categoryID: number
  ): Promise<Category | undefined> => {
    const validatedCategory = UpdateCategoryInput.parse(service);

    if (validatedCategory) {
      const updatedService = await CategoryService.update(
        {
          categoryName: validatedCategory.categoryName,
          categoryImageUrl: validatedCategory.categoryImageUrl || '',
        },
        categoryID
      );

      return updatedService;
    }

    return undefined;
  };

  static delete = async (categoryID: number): Promise<Category> => {
    return CategoryService.delete(categoryID);
  };
}

export default CategoryHandler;

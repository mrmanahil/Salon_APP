import {
  CreateCategoryInput,
  Category,
  Categories,
  UpdateCategoryInput,
} from './category.model';

class CategoryService {
  static getAll = (): Promise<Category[]> => {
    return Categories.findMany();
  };

  static getByID = (categoryID: number): Promise<Category | null> => {
    return Categories.findFirst({ where: { categoryID } });
  };

  static create = (category: CreateCategoryInput): Promise<Category> => {
    return Categories.create({
      data: {
        categoryName: category.categoryName,
        categoryImageUrl: '',
      },
    });
  };

  static update = (
    category: UpdateCategoryInput,
    categoryID: number
  ): Promise<Category> => {
    return Categories.update({
      data: {
        categoryName: category.categoryName,
        categoryImageUrl: category.categoryImageUrl,
      },
      where: {
        categoryID,
      },
    });
  };

  static delete = (categoryID: number): Promise<Category> => {
    return Categories.delete({
      where: {
        categoryID,
      },
    });
  };
}

export default CategoryService;

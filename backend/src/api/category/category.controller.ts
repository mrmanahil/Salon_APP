import { NextFunction, Request, Response } from 'express';
import { join } from 'path';
import { copyFile, rm } from 'fs/promises';
import createSuccessResponse, {
  SuccessResponse,
} from '../../util/createResponse';
import {
  CreateCategoryInput,
  DeleteCategoryInputParams,
  GetByIDInput,
  Category,
  UpdateCategoryInput,
  UpdateCategoryInputParams,
} from './category.model';
import ErrorResponse from '../../util/createError';
import CategoryHandler from './category.handler';
import { SETUP } from '../../config/setup';

class CategoryController {
  static getAll = async (
    req: Request<void, SuccessResponse<Category[]>>,
    res: Response<SuccessResponse<Category[]>>,
    next: NextFunction
  ) => {
    try {
      const categories = await CategoryHandler.getAll();

      res.send(
        createSuccessResponse(categories, 'Categories found Successfully')
      );
    } catch (error) {
      next(error);
    }
  };

  static getByID = async (
    req: Request<GetByIDInput, SuccessResponse<Category | null>>,
    res: Response<SuccessResponse<Category | null>>,
    next: NextFunction
  ) => {
    try {
      const { categoryID } = req.params;
      const category = await CategoryHandler.getByID(+categoryID);

      if (!category) {
        next(
          new ErrorResponse(`Category with the ID ${categoryID} not found`, 400)
        );
        return null;
      }

      res.send(createSuccessResponse(category, 'Category found successfully'));
    } catch (error) {
      next(error);
    }

    return null;
  };

  static create = async (
    req: Request<any, SuccessResponse<Category>, CreateCategoryInput>,
    res: Response<SuccessResponse<Category>>,
    next: NextFunction
  ) => {
    try {
      const category = req.body;
      const newService = await CategoryHandler.create({
        categoryName: category.categoryName,
      });

      if (!newService) {
        return next(
          new ErrorResponse(`Category can not be created, error ocurred`, 400)
        );
      }

      res.send(
        createSuccessResponse(newService, 'Category created successfully')
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static update = async (
    req: Request<
      UpdateCategoryInputParams,
      SuccessResponse<Category>,
      UpdateCategoryInput
    >,
    res: Response<SuccessResponse<Category>>,
    next: NextFunction
  ) => {
    try {
      const category = req.body;
      const updatedCategory = await CategoryHandler.update(
        { categoryName: category.categoryName },
        +req.params.categoryID
      );

      if (!updatedCategory) {
        return next(
          new ErrorResponse(`Category can not be created, error ocurred`, 400)
        );
      }

      res.send(
        createSuccessResponse(updatedCategory, 'Category updated successfully')
      );
    } catch (error) {
      next(error);
    }

    return next();
  };

  static uploadImage = async (
    req: Request<{}, SuccessResponse<Category>, { categoryID: string }>,
    res: Response<SuccessResponse<Category>>,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        return next(new ErrorResponse(`File is required`, 400));
      }

      const category = await CategoryHandler.getByID(+req.body.categoryID);

      if (!category) {
        return next(new ErrorResponse(`Category does not exists`, 404));
      }

      const previousCategoryImage = category.categoryImageUrl;
      if (previousCategoryImage && previousCategoryImage !== null) {
        const imageFile = previousCategoryImage.split('/');
        const imageFileName = imageFile[imageFile.length - 1];
        const imageFilePath = join(
          __dirname,
          '../../../public/category',
          imageFileName
        );
        const tempImageFilePath = join(
          __dirname,
          '../../../temp',
          imageFileName
        );
        await copyFile(imageFilePath, tempImageFilePath);
        await rm(imageFilePath, { maxRetries: 5 });
      }

      const imageUrl = `${SETUP.API_KEY}/category/${req.file.filename}`;

      const data = await CategoryHandler.update(
        {
          categoryName: category.categoryName,
          categoryImageUrl: imageUrl,
        },
        +req.body.categoryID
      );

      if (!data) {
        return next(new ErrorResponse(`Category Update was unsuccessful`, 404));
      }

      res.send(
        createSuccessResponse(data, 'Category Image Uploaded successfully')
      );
    } catch (error) {
      next(error);
    }

    return null;
  };

  static delete = async (
    req: Request<DeleteCategoryInputParams, SuccessResponse<{}>>,
    res: Response<SuccessResponse<{}>>,
    next: NextFunction
  ) => {
    try {
      const isDeleted = await CategoryHandler.delete(+req.params.categoryID);

      if (isDeleted) {
        res.send(createSuccessResponse({}, 'Category deleted successfully'));
      } else {
        return next(new ErrorResponse(`Category can not be deleted`, 400));
      }
    } catch (error) {
      return next(error);
    }

    return next();
  };
}

export default CategoryController;

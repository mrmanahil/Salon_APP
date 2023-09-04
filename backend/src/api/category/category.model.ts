/* eslint-disable no-redeclare */
import * as zod from 'zod';
import db from '../../util/db';

export const Category = zod.object({
  categoryID: zod.number().optional(),
  categoryName: zod.string(),
  categoryImageUrl: zod.string(),
});

export const CreateCategoryInput = zod.object({
  categoryName: zod.string(),
});

export const UpdateCategoryInput = zod.object({
  categoryName: zod.string().optional(),
  categoryImageUrl: zod.string().optional(),
});

export const GetByIDInput = zod.object({
  categoryID: zod.string(),
});
export const UpdateCategoryInputParams = zod.object({
  categoryID: zod.number(),
});
export const DeleteCategoryInputParams = zod.object({
  categoryID: zod.number(),
});

export type Category = zod.infer<typeof Category>;
export type CreateCategoryInput = zod.infer<typeof CreateCategoryInput>;
export type UpdateCategoryInput = zod.infer<typeof UpdateCategoryInput>;
export type GetByIDInput = zod.infer<typeof GetByIDInput>;
export type UpdateCategoryInputParams = zod.infer<
  typeof UpdateCategoryInputParams
>;
export type DeleteCategoryInputParams = zod.infer<
  typeof DeleteCategoryInputParams
>;
export const Categories = db.category;

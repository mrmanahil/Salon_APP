import { axiosInstance } from "../config/axios";

export interface Category {
  categoryName: string;
  categoryImageUrl: string;
  categoryID: number;
}

export interface GetCategoryRes {
  data: Category[];
}

export interface CreateCategoryInput {
  categoryName: string;
}

export interface CreateCategoryRes {
  data: Category;
}

export interface UpdateCategoryInput {
  categoryName: string;
  categoryID: number;
}

interface UploadCategoryImageInput {
  file: File;
  categoryID: number;
}

function getCategories() {
  return axiosInstance.get<GetCategoryRes>("/category");
}

function create(data: CreateCategoryInput) {
  return axiosInstance.post<CreateCategoryRes>("/category", data);
}

function update(data: UpdateCategoryInput) {
  return axiosInstance.patch(`/category/${data.categoryID}`, data);
}

function uploadCategoryImage(data: UploadCategoryImageInput) {
  const formData = new FormData();

  formData.append("category_image", data.file);
  formData.append("categoryID", `${data.categoryID}`);

  return axiosInstance.patch("/category/image", formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export { create, update, uploadCategoryImage, getCategories };

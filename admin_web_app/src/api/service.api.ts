import { axiosInstance } from "../config/axios";

interface Service {
  serviceID: number;
  serviceName: string;
  servicePrice: number;
  serviceDurationInMinutes: number;
  serviceDiscountPrice: number;
  shopID: number;
  serviceImageUrl: string;
  categoryID: number;
}

interface GetServicesRes {
  data: Service[];
}

export interface CreateServiceInput {
  serviceName: string;
  servicePrice: number;
  serviceDurationInMinutes: number;
  serviceDiscountPrice: number;
  shopID: number;
  categoryID: number;
}

interface CreateServiceRes {
  data: Service;
}

interface UpdateServiceInput {
  serviceName?: string;
  serviceImageUrl?: string;
  servicePrice?: number;
  serviceDurationInMinutes?: number;
  serviceDiscountPrice?: number;
  categoryID?: number;
  serviceID: number;
}

interface UploadServiceImage {
  file: File;
  serviceID: number;
}

function get() {
  return axiosInstance.get<GetServicesRes>("/service");
}

function create(data: CreateServiceInput) {
  return axiosInstance.post<CreateServiceRes>("/service", data);
}

function update(data: UpdateServiceInput) {
  return axiosInstance.patch(`/service/${data.serviceID}`, data);
}

function uploadServiceImage(data: UploadServiceImage) {
  const formData = new FormData();

  formData.append("service_image", data.file);
  formData.append("serviceID", `${data.serviceID}`);

  return axiosInstance.patch("/service/image", formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export { create, update, uploadServiceImage, get };

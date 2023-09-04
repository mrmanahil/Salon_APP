import { axiosInstance } from "../config/axios";
import { User } from "./user.api";

interface Address {
  countryID: number;
  stateID: number;
  cityID: number;
  addressLine1: string;
  addressLine2: string;
}

interface Barber {
  barberID: number;
  barberName: string;
  imageUrl: string;
  totalExperienceInYears: string;
  userID: number;
}

interface GetBarberRes {
  data: Barber[];
}

export interface CreateBarberInput {
  name: string;
  email: string;
  password: string;
  userTypeID: number;
  totalExperienceInYear: number;
  address: Address;
}

interface CreateBarberRes {
  data: User & { barber: Barber };
}

interface UploadBarberImageInput {
  file: File;
  barberID: number;
}

function get() {
  return axiosInstance.get<GetBarberRes>("/user/barber");
}

function create(data: CreateBarberInput) {
  return axiosInstance.post<CreateBarberRes>("/user/register", { ...data, userTypeID: 3 });
}

function uploadBarberImage(data: UploadBarberImageInput) {
  const formData = new FormData();

  formData.append("barber_image", data.file);
  formData.append("barberID", `${data.barberID}`);

  return axiosInstance.patch("/user/barber/image", formData, { headers: { "Content-Type": "multipart/form-data" } });
}

export { create, uploadBarberImage, get };

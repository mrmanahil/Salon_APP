import { axiosInstance } from "../config/axios";

interface City {
  cityName: string;
  cityCode: string;
  cityID: number;
  stateID: number;
}

interface GetCityRes {
  data: City[];
}

function getAllCities() {
  return axiosInstance.get<GetCityRes>("/city");
}

export { getAllCities };

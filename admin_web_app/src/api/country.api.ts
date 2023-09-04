import { axiosInstance } from "../config/axios";

interface Country {
  countryName: string;
  countryCode: string;
  countryID: number;
}

interface GetCountryRes {
  data: Country[];
}

function getAllCountries() {
  return axiosInstance.get<GetCountryRes>("/country");
}

export { getAllCountries };

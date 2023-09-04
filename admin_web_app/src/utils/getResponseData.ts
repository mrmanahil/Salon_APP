import { AxiosResponse } from "axios";

function getResponseData<T>(data: AxiosResponse<{ data: T }>) {
  return data.data.data;
}

export default getResponseData;

import { axiosInstance } from "../config/axios";

interface State {
  stateName: string;
  stateCode: string;
  stateID: number;
  countryID: number;
}

interface GetStateRes {
  data: State[];
}

function getAllStates() {
  return axiosInstance.get<GetStateRes>("/state");
}

export { getAllStates };

import { axiosInstance } from "../config/axios";

interface Address {
  countryID: number;
  stateID: number;
  cityID: number;
  addressLine1: string;
  addressLine2: string;
}

export interface User {
  userID: number;
  name: string;
  email: string;
  password: string;
  userTypeID: number;
  address: Address;
}

interface CreateUserInputAddress {
  countryID: string;
  stateID: string;
  cityID: string;
  addressLine1: string;
  addressLine2: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  userTypeID: number;
  address: CreateUserInputAddress;
}

function login(data: { email: string; password: string; userTypeID: string }) {
  return axiosInstance.post("/user/login", data);
}

function getMe() {
  return axiosInstance.post("/me");
}

function create(data: CreateUserInput) {
  return axiosInstance.post("/user/register", data);
}

export { login, getMe, create };

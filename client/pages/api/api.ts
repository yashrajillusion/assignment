import axios, { AxiosInstance } from "axios";
import {
  AuthUserData,
  CommonApiResponse,
  LoginReqData,
  RegisterReqData,
} from "./types";
import { getGlobalItem } from "@/utils/local-storage";
const accessToken = getGlobalItem("user").access_token;

export const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    authorization: "Bearer " + accessToken,
  },
});

export const setInstance = (instance: AxiosInstance) => {
  instance.defaults.headers["authorization"] =
    "Bearer " + getGlobalItem("user").access_token;
};

export const login = async (
  loginData: LoginReqData
): Promise<CommonApiResponse<AuthUserData>> => {
  const { data } = await instance.post("login-user", loginData);
  return data;
};

export const registerAccount = async (
  registerData: RegisterReqData
): Promise<CommonApiResponse<AuthUserData>> => {
  const { data } = await instance.post("add-user", registerData);
  return data;
};

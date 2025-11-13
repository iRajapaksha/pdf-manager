import type { LoginRequest, RegisterRequest } from "../types/apiTypes";
import axiosInstance from "./axiosInstance";

export const login = async (login: LoginRequest) => {
  const response = await axiosInstance.post("/auth/login", login);
  return response.data;
};

export const register = async (register: RegisterRequest) => {
  const response = await axiosInstance.post("/auth/register", register);
  return response.data;
};

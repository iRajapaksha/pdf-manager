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

export const signOut = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
};

export const getToken = () => localStorage.getItem("authToken");

export const setToken = (token: string) => {
  localStorage.setItem("authToken", token);
};
  
export const clearToken = () => {
  localStorage.removeItem("authToken");
};

import type { User } from "../types/apiTypes";
import axiosInstance from "./axiosInstance";

export const getMyProfile = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("/users/me");
  return response.data;
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/users/me");
  return res.data;
};
import type { PDF } from "../types/apiTypes";
import axiosInstance from "./axiosInstance";

export const getPDFs = async (): Promise<PDF[]> => {
  const response = await axiosInstance.get("/pdf");
  return response.data;
};

export const deletePdf = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/pdf/${id}`);
};

export const uploadPDF = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  await axiosInstance.post("/pdf/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

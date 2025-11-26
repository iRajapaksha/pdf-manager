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

export const getPDF = async (id: number): Promise<PDF> => {
  const response = await axiosInstance.get(`/pdf/${id}`);
  return response.data;
};

export const getPdfDocument = async (id: string) => {
  return await axiosInstance.get(`/pdf/${id}`);
};

export const logActivity = async (
  action: string,
  subjectType: string,
  subjectId: string,
  metadata: Record<string, string | null> = {}
): Promise<void> => {
  try {
    await axiosInstance.post("/activity/log", {
      action,
      subject_type: subjectType,
      subject_id: subjectId,
      metadata,
    });
  } catch (err) {
    // Don't throw — logging activity is best-effort. Keep a console warn for visibility.
    // This prevents the UI from failing when the activity endpoint is missing (404) or unavailable.
    // The original server in this session returned 404 sometimes — swallow it safely.
    console.warn("logActivity failed:", err);
    // intentionally not throwing - logging should not impact UI
  }
};

export const getPDFUrl = async (filePath: string): Promise<string> => {
  const response = await axiosInstance.get("/pdf/get-url", {
    params: { file_path: filePath },
  });
  return response.data.url;
};

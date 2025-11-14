import { PDF } from "../models/pdf.model";

export const uploadPDF = async (userId: string, file: Express.Multer.File) => {
  return await PDF.create({
    userId,
    fileName: file.filename,
    originalName: file.originalname,
    size: file.size,
  });
};

export const getPDFs = async (userId: string) => {
 
  return await PDF.find({ userId: userId }).sort({ uploadedAt: -1 });
};

export const deletePDF = async (id: string) => {
  return await PDF.findByIdAndDelete(id);
};

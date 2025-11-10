import { PDF } from "../models/pdf.model";
import { Activity } from "../models/activity.model";

export const uploadPDF = async (userId: string, file: Express.Multer.File) => {
  const pdf = await PDF.create({
    userId,
    filename: file.filename,
    originalName: file.originalname,
    size: file.size
  });

  await Activity.create({ userId, action: `Uploaded ${file.originalname}` });
  return pdf;
};

import { Request, Response } from "express";
import * as PDFService from "../services/pdf.service";

export const uploadPDF = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const file = req.file!;
  const pdf = await PDFService.uploadPDF(userId, file);
  res.json({ success: true, pdf });
};

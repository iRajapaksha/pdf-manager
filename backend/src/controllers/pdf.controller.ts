import { Request, Response } from "express";
import * as PDFService from "../services/pdf.service";

export const uploadPDF = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const pdf = await PDFService.uploadPDF(userId, req.file!);
    res.json(pdf);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPDFs = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // comes from auth middleware

    const pdfs = await PDFService.getPDFs(userId);
    res.json(pdfs);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePDF = async (req: Request, res: Response) => {
  try {
    await PDFService.deletePDF(req.params.id);
    res.json({ message: "PDF deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

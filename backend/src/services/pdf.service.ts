import { PDF } from "../models/pdf.model";

export const uploadPDF = async (userId: string, file: Express.Multer.File) => {
  // make URL accessible for frontend. Prefer a configured SERVER_URL, fall back
  // to relative path so clients can use the current origin.
  const base = process.env.SERVER_URL
    ? process.env.SERVER_URL.replace(/\/$/, "")
    : "";
  const url = `${base}/uploads/${file.filename}`;

  return await PDF.create({
    userId,
    fileName: file.filename,
    originalName: file.originalname,
    size: file.size,
    url,
  });
};

export const getPDFs = async (userId: string) => {
  // ensure returned pdf objects include a usable `url` (for older entries this
  // might be missing). Use SERVER_URL when configured, otherwise return
  // relative `/uploads/...` path.
  const base = process.env.SERVER_URL
    ? process.env.SERVER_URL.replace(/\/$/, "")
    : "";

  const pdfs = await PDF.find({ userId: userId })
    .sort({ uploadedAt: -1 })
    .lean();

  return pdfs.map((p: any) => ({
    ...p,
    url: p.url || `${base}/uploads/${p.fileName}`,
  }));
};

export const deletePDF = async (id: string) => {
  return await PDF.findByIdAndDelete(id);
};

export const getPDFById = async (id: string) => {
  const base = process.env.SERVER_URL
    ? process.env.SERVER_URL.replace(/\/$/, "")
    : "";

  const pdf = await PDF.findById(id).lean();
  if (!pdf) return null;
  return { ...pdf, url: pdf.url || `${base}/uploads/${pdf.fileName}` };
};

import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  filename: String,
  originalName: String,
  uploadedAt: { type: Date, default: Date.now },
  size: Number
});

export const PDF = mongoose.model("PDF", pdfSchema);

import express from "express";
import multer from "multer";
import * as PDFController from "../controllers/pdf.controller";
import { authenticate } from "../middleware/auth.middleware";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", authenticate, PDFController.getPDFs);
router.post("/upload", authenticate, upload.single("file"), PDFController.uploadPDF);
router.delete("/:id", authenticate, PDFController.deletePDF);
router.get("/:id", authenticate, PDFController.getPDFById);

export default router;

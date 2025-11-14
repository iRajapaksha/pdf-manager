import express from "express";
import multer from "multer";
import { authenticate } from "../middleware/auth.middleware";
import * as PDFController from "../controllers/pdf.controller";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", authenticate, PDFController.getPDFs);
router.post("/upload", authenticate, upload.single("file"), PDFController.uploadPDF);
router.delete("/:id", authenticate, PDFController.deletePDF);

export default router;

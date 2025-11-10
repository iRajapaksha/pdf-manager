import express from "express";
import * as PDFController from "../controllers/pdf.controller";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../utils/fileStorage";

const router = express.Router();
router.post("/upload", authenticate, upload.single("file"), PDFController.uploadPDF);

export default router;

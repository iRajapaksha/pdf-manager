import express from "express";
import * as ActivityController from "../controllers/activity.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();
router.get("/", authenticate, ActivityController.getActivity);

export default router;

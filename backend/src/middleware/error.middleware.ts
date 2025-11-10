import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, _: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
};

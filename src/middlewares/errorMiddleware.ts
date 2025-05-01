import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode: number;
}
export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_DEVELOPMENT == "production" ? undefined : err.stack,
  });
};

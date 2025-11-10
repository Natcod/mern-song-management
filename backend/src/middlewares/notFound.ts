import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new ApiError(404, `Route not found: ${req.originalUrl}`);
  next(error);
};

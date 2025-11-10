import { Request, Response, NextFunction } from 'express';
import { statsService } from '../services/statsService';
import { ApiResponse } from '../utils/ApiResponse';

export const statsController = {
  // Get all statistics
  async getStatistics(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const stats = await statsService.getStatistics();

      const response = new ApiResponse(200, 'Statistics retrieved successfully', stats);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};

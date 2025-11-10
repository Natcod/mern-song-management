import { Request, Response, NextFunction } from 'express';
import { statsService } from '../services/statsService.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const statsController = {
  // Get all statistics
  async getStatistics(
    _req: Request,
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

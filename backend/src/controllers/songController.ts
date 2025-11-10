import { Request, Response, NextFunction } from 'express';
import { songService, SongInput, QueryOptions } from '../services/songService';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

export const songController = {
  // Create a new song
  async createSong(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { title, artist, album, genre } = req.body;

      // Validate required fields
      if (!title || !artist || !album || !genre) {
        throw new ApiError(400, 'All fields are required: title, artist, album, genre');
      }

      const songData: SongInput = { title, artist, album, genre };
      const song = await songService.createSong(songData);

      const response = new ApiResponse(201, 'Song created successfully', song);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Get all songs with filtering, searching, and pagination
  async getAllSongs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { genre, artist, album, search, page, limit } = req.query;

      const options: QueryOptions = {
        genre: genre as string,
        artist: artist as string,
        album: album as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 10,
      };

      const result = await songService.getAllSongs(options);

      const response = new ApiResponse(200, 'Songs retrieved successfully', result);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Get song by ID
  async getSongById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const song = await songService.getSongById(id);

      const response = new ApiResponse(200, 'Song retrieved successfully', song);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Update song by ID
  async updateSong(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { title, artist, album, genre } = req.body;

      const songData: Partial<SongInput> = {};
      if (title) songData.title = title;
      if (artist) songData.artist = artist;
      if (album) songData.album = album;
      if (genre) songData.genre = genre;

      const song = await songService.updateSong(id, songData);

      const response = new ApiResponse(200, 'Song updated successfully', song);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  // Delete song by ID
  async deleteSong(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const song = await songService.deleteSong(id);

      const response = new ApiResponse(200, 'Song deleted successfully', song);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};

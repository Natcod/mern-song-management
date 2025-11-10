import { Song, ISong } from '../models/Song';
import { ApiError } from '../utils/ApiError';

export interface SongInput {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface QueryOptions {
  genre?: string;
  artist?: string;
  album?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResult {
  songs: ISong[];
  totalSongs: number;
  totalPages: number;
  currentPage: number;
}

export const songService = {
  // Create a new song
  async createSong(songData: SongInput): Promise<ISong> {
    const song = await Song.create(songData);
    return song;
  },

  // Get all songs with filtering, searching, and pagination
  async getAllSongs(options: QueryOptions): Promise<PaginatedResult> {
    const {
      genre,
      artist,
      album,
      search,
      page = 1,
      limit = 10,
    } = options;

    // Build query
    const query: any = {};

    if (genre) {
      query.genre = genre.toLowerCase();
    }

    if (artist) {
      query.artist = new RegExp(artist, 'i');
    }

    if (album) {
      query.album = new RegExp(album, 'i');
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { artist: new RegExp(search, 'i') },
        { album: new RegExp(search, 'i') },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [songs, totalSongs] = await Promise.all([
      Song.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Song.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalSongs / limit);

    return {
      songs: songs as unknown as ISong[],
      totalSongs,
      totalPages,
      currentPage: page,
    };
  },

  // Get song by ID
  async getSongById(id: string): Promise<ISong> {
    const song = await Song.findById(id);

    if (!song) {
      throw new ApiError(404, 'Song not found');
    }

    return song;
  },

  // Update song by ID
  async updateSong(id: string, songData: Partial<SongInput>): Promise<ISong> {
    const song = await Song.findByIdAndUpdate(
      id,
      songData,
      { new: true, runValidators: true }
    );

    if (!song) {
      throw new ApiError(404, 'Song not found');
    }

    return song;
  },

  // Delete song by ID
  async deleteSong(id: string): Promise<ISong> {
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      throw new ApiError(404, 'Song not found');
    }

    return song;
  },
};

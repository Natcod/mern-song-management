export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface SongInput {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  totalPages: number;
  totalSongs: number;
}

export interface SongsResponse {
  songs: Song[];
  totalSongs: number;
  totalPages: number;
  currentPage: number;
}

export interface Filters {
  genre?: string;
  artist?: string;
  album?: string;
  search?: string;
}

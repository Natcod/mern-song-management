import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Song, Filters, PaginationData } from '../../types/Song';

interface SongsState {
  list: Song[];
  loading: boolean;
  error: string | null;
  pagination: PaginationData;
  filters: Filters;
}

const initialState: SongsState = {
  list: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalSongs: 0,
  },
  filters: {},
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Fetch songs
    fetchSongsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<{ songs: Song[]; totalSongs: number; totalPages: number; currentPage: number }>) => {
      state.loading = false;
      state.list = action.payload.songs;
      state.pagination = {
        page: action.payload.currentPage,
        limit: state.pagination.limit,
        totalPages: action.payload.totalPages,
        totalSongs: action.payload.totalSongs,
      };
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create song
    createSongRequest: (state, _action: PayloadAction<{ title: string; artist: string; album: string; genre: string }>) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state) => {
      state.loading = false;
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update song
    updateSongRequest: (state, _action: PayloadAction<{ id: string; data: Partial<{ title: string; artist: string; album: string; genre: string }> }>) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state) => {
      state.loading = false;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete song
    deleteSongRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state) => {
      state.loading = false;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Filters
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
      state.pagination.page = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {};
      state.pagination.page = 1;
    },

    // Pagination
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  setFilters,
  clearFilters,
  setPage,
} = songsSlice.actions;

export default songsSlice.reducer;

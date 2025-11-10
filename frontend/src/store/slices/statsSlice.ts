import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Statistics } from '../../types/Stats';

interface StatsState {
  data: Statistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  data: null,
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    fetchStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action: PayloadAction<Statistics>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} = statsSlice.actions;

export default statsSlice.reducer;

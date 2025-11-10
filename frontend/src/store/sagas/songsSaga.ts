import { call, put, takeEvery, select } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { songsApi } from '../../api/songsApi';
import {
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
} from '../slices/songsSlice';
import { fetchStatsRequest } from '../slices/statsSlice';
import type { RootState } from '../index';
import type { SongsResponse } from '../../types/Song';

function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    const state: RootState = yield select();
    const { filters, pagination } = state.songs;

    const data: SongsResponse = yield call(songsApi.getSongs, {
      ...filters,
      page: pagination.page,
      limit: pagination.limit,
    });

    yield put(fetchSongsSuccess(data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSongSaga(action: PayloadAction<{ title: string; artist: string; album: string; genre: string }>): Generator<any, void, any> {
  try {
    yield call(songsApi.createSong, action.payload);
    yield put(createSongSuccess());
    // Refresh songs and stats after creation
    yield put(fetchSongsRequest());
    yield put(fetchStatsRequest());
  } catch (error: any) {
    yield put(createSongFailure(error.message));
  }
}

function* updateSongSaga(action: PayloadAction<{ id: string; data: any }>): Generator<any, void, any> {
  try {
    yield call(songsApi.updateSong, action.payload.id, action.payload.data);
    yield put(updateSongSuccess());
    // Refresh songs and stats after update
    yield put(fetchSongsRequest());
    yield put(fetchStatsRequest());
  } catch (error: any) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSongSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    yield call(songsApi.deleteSong, action.payload);
    yield put(deleteSongSuccess());
    // Refresh songs and stats after deletion
    yield put(fetchSongsRequest());
    yield put(fetchStatsRequest());
  } catch (error: any) {
    yield put(deleteSongFailure(error.message));
  }
}

export default function* songsSaga() {
  yield takeEvery(fetchSongsRequest.type, fetchSongsSaga);
  yield takeEvery(createSongRequest.type, createSongSaga);
  yield takeEvery(updateSongRequest.type, updateSongSaga);
  yield takeEvery(deleteSongRequest.type, deleteSongSaga);
}

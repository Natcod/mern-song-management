import { call, put, takeEvery } from 'redux-saga/effects';
import { statsApi } from '../../api/statsApi';
import {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} from '../slices/statsSlice';
import type { Statistics } from '../../types/Stats';

function* fetchStatsSaga(): Generator<any, void, Statistics> {
  try {
    const data = yield call(statsApi.getStats);
    yield put(fetchStatsSuccess(data));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message));
  }
}

export default function* statsSaga() {
  yield takeEvery(fetchStatsRequest.type, fetchStatsSaga);
}

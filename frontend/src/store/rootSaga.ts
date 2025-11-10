import { all } from 'redux-saga/effects';
import songsSaga from './sagas/songsSaga';
import statsSaga from './sagas/statsSaga';

export default function* rootSaga() {
  yield all([
    songsSaga(),
    statsSaga(),
  ]);
}

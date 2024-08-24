import {all} from 'redux-saga/effects';
import globalSagaWatcher from '../global/GlobalSaga';
import authSagaWatcher from '../auth/AuthSaga';


export default function* RootSaga() {
  yield all([
    globalSagaWatcher(),
    authSagaWatcher(),

  ]);
}

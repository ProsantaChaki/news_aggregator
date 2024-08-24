import {put, select} from 'redux-saga/effects';
import getGlobalState from './global/globalSelector';
import {commonModalDataSet} from './global/GlobalActionCreators';

export function* networkCallSaga() {
  const globalState = yield select(getGlobalState);
  const {isConnectedToInternet} = globalState;
  if (!isConnectedToInternet) {
    yield put(
      commonModalDataSet({
        status: true,
        title: 'You’re Offline',
        body:
          'You’re not connected to the Internet. Please check your settings and connection.',
        buttonText: 'OK',
      }),
    );
    return false;
  } else {
    return true;
  }
}

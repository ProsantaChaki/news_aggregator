
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {
 NEWS_API_CALL,
} from './GlobalActionTypes';
// import {
//   getUserName,
//   getUserPassword,
// } from './../../common/storage/storageManager';
import {
  authLoginApiCall,
} from '../auth/AuthActionCreators';
import {
} from '../../common/apiCall/api';
import {
  // hideLoader,
  // showLoader,
} from './GlobalActionCreators';


function* newsDataFetchWorker({payload}) {
  try {
    const {isAuthenticated} = payload;
    const loginData = {
      cell_phone: yield call(getUserName),
      password: yield call(getUserPassword),
    };
    if (!isAuthenticated && loginData.cell_phone && loginData.password) {
      yield put(
        authLoginApiCall({
          cell_phone: '' + loginData.cell_phone,
          password: '' + loginData.password,
          isSilent: true,
          device_token: '-_-',
        }),
      );
    }
  } catch (e) {
    console.log(e);
  }
}


function* globalSagaWatcher() {
  yield takeLatest(NEWS_API_CALL, newsDataFetchWorker);
  /*yield takeLatest(SUGGESTION_API_CALL, suggestionApiCallWorker);
  yield takeLatest(RELOAD_APP, reloadAPPWorker);
  yield takeLatest(IMAGE_UPLOAD, uploadImage);*/
}

export default globalSagaWatcher;

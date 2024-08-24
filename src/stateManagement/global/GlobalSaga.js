/*
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {
  RELOAD_APP,
  START_INIT_APP,
  SUGGESTION_API_CALL,
  IMAGE_UPLOAD,
} from './GlobalActionTypes';
import {
  getUserName,
  getUserPassword,
} from './../../common/storage/storageManager';
import {
  authLoginApiCall,
  fetchUserProfile,
  setUserProfileToReducer,
} from '../auth/AuthActionCreators';
import {
  fetchUserProfileAPIGet,
  gameSuggestionAPIGet,
  imageUpload,
} from '../../common/apiCall/api';
import {
  gameSuggestionApiCall,
  gameSuggestionStore,
  hideLoader,
  reloadAPP,
  showLoader,
} from './GlobalActionCreators';

import fs from 'react-native-fs';

function* appInitWorker({payload}) {
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

function* suggestionApiCallWorker() {
  try {
    const suggestions = yield call(gameSuggestionAPIGet);
    //console.log(suggestions);
    yield put(gameSuggestionStore(suggestions.data));
  } catch (e) {
    console.log(e);
  }
}
function* reloadAPPWorker() {
  try {
    yield put(showLoader());
    yield put(fetchUserProfile());
    yield put(onGoingGameApiCall());
    yield put(winHistoryApiCall());
    yield put(gameSuggestionApiCall());
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());

    console.log(e);
  }
}
function* uploadImage({payload}) {
  try {
    yield put(showLoader());

    let fileExtension = payload.uri.split('.').pop();

    //console.log('node.image.uri', payload.uri);
    const file = {
      uri: payload.uri,
      name: Math.random().toString(36).substring(7) + '.' + fileExtension,
      type: payload.type,
    };

    const imagefileData = yield fs.readFile(file.uri, 'base64');

    console.log('file', file);

    const respons = yield call(imageUpload, {
      profile_image: 'data:' + file.type + ';base64,' + imagefileData,
    });

    yield put(setUserProfileToReducer(respons.data));
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());

    console.log(e);
  }
}
*/

function* globalSagaWatcher() {
  /*yield takeLatest(START_INIT_APP, appInitWorker);
  yield takeLatest(SUGGESTION_API_CALL, suggestionApiCallWorker);
  yield takeLatest(RELOAD_APP, reloadAPPWorker);
  yield takeLatest(IMAGE_UPLOAD, uploadImage);*/
}

export default globalSagaWatcher;


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
    newsApiApiCall
} from '../../common/apiCall/api';
import {
    newsDataStore
    // hideLoader,
    // showLoader,
} from './GlobalActionCreators';

import {newsApiDataProcessing} from '../../common/dataProcessing.js';


function* newsDataFetchWorker({payload}) {
  try {
      let news =[]
      console.log('.....globalSaga newsDataFetchWorker')
      let queryParam = "q=Joe Biden&sortBy=popularity"
      let res = yield call(newsApiApiCall, queryParam);
      if(res.status == 'ok') {
           news = yield call(newsApiDataProcessing, res?.articles);
          console.log('33',news)
      }
      yield put(
          newsDataStore(news),
      );
      console.log('38',res)

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

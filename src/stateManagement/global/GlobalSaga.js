
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
    newsApiApiCall, newsApiCall, newsYorkTimeApiCall,
} from '../../common/apiCall/api';
import {
    newsDataStore
    // hideLoader,
    // showLoader,
} from './GlobalActionCreators';

import {newsApiDataProcessing, newsYorkTimeDataProcessing, newsProcessing, mergeAndShuffleArrays} from '../../common/dataProcessing.js';


function* newsDataFetchWorker({payload}) {
  try {
      let news =[]
      let news2 =[]
      let news3 =[]
      payload.search = payload.search.len>0?payload.search:'ne'
      let  queryParam ="q="+payload.search+"&sortBy=popularity"
      let newsApiOrg = yield call(newsApiApiCall, queryParam);
      if(newsApiOrg.status == 'ok') news = yield call(newsApiDataProcessing, newsApiOrg?.articles)
      let newsYorkTime = yield call(newsYorkTimeApiCall, queryParam);
      if(newsYorkTime.status == 'ok') {
          news2 = yield call(newsYorkTimeDataProcessing, newsYorkTime?.docs)
      }
      let newsApi = yield call(newsApiCall, queryParam);

      if(newsApi.articles && newsApi.articles?.results?.length > 0){
          news3 = yield call(newsProcessing, newsApi.articles?.results)
      }
      let allNews = yield call(mergeAndShuffleArrays, news, news3, news2)

      yield put(
          newsDataStore(allNews),
      );

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

import {
  IS_AUTHENTICATED,
  COMMON_MODAL_DATA_SET,
  LOADER_SHOW,
  LOADER_HIDE,
  NEWS_API_CALL,
  NEWS_STORE
} from './GlobalActionTypes';

function newsApiCallWorker(payload){
  return{
    type: NEWS_API_CALL,
    payload
  }
}
function newsDataStore(payload){
  console.log(payload);
  return{
    type: NEWS_STORE,
    payload: {news:payload}
  }
}

function setIsAuthenticated(payload) {
  return {
    type: IS_AUTHENTICATED,
    payload
  };
}
function commonModalDataSet(payload) {
  return {
    type: COMMON_MODAL_DATA_SET,
    payload,
  };
}
function showLoader() {
  return {
    type: LOADER_SHOW,
  };
}

function hideLoader() {
  return {
    type: LOADER_HIDE,
  };
}
export {
  setIsAuthenticated,
  commonModalDataSet,
  showLoader,
  newsApiCallWorker,
  newsDataStore
};

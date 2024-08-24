import {
  IS_AUTHENTICATED,
  COMMON_MODAL_DATA_SET,
  LOADER_SHOW,
  LOADER_HIDE,
  UPDATE_IS_AUTHENTICATEED,SET_VALIDITY,
  TEST_DATA_UPDATE, SET_GLOBAL_SETTINGS
} from './GlobalActionTypes';

function testDataUpdate(message){
  return{
    type: TEST_DATA_UPDATE,
    payload: {message:message}
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
function upeateIsAuthenticated() {
  return {
    type: UPDATE_IS_AUTHENTICATEED,
  };
}
function setGlobalSettingToReducer(payload) {
  return {
    type: SET_GLOBAL_SETTINGS,
    payload
  };
}

function setValidityToReducer(payload) {
  return {
    type: SET_VALIDITY,
    payload
  };
}

export {
  setIsAuthenticated,
  commonModalDataSet,
  showLoader,
  hideLoader,
  upeateIsAuthenticated,
  testDataUpdate,
  setGlobalSettingToReducer,setValidityToReducer
};

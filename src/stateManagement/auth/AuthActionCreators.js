import {AUTH_LOGIN_API_CALL} from './AuthActionTypes';

function authLoginApiCall(payload) {
  return {
    type: AUTH_LOGIN_API_CALL,
    payload,
  };
}

export {
  authLoginApiCall,
};

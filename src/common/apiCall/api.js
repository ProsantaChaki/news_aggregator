import {apiDelete, apiGet, apiPost, apiPut} from './axiosSetup';
import * as env from '../../../env.js';
import {
    LOGIN_URL,
    OTP_LOGIN_URL, TEST_API,

} from '../constantData/apiUrls.js';

export function loginApiCall(payload) {
  return apiPost(
    LOGIN_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}


export function otploginApiCall(payload) {
  return apiPost(
    OTP_LOGIN_URL,
    payload,
    {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}

export function testApiCall(queryParam=false) {
  let url = TEST_API;
  if (queryParam){
     url = url+'?'+queryParam;
  }
  return apiGet(
     url,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    },
    false,
    false,
  );
}


export function userUpdateApiCall(payload) {
    return apiPut(
        'USER_STORE_URL',
        payload,
        {
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
        false,
    );
}


export function newsApiApiCall(queryParam=false) {
    let url = env.REACT_APP_NEWS_API_URL;
    if (queryParam){
        url = url+'/everything?'+queryParam+'&apiKey='+env.REACT_APP_NEWS_API_TOKEN;
    }else{
        url = url+'/everything?apiKey='+env.REACT_APP_NEWS_API_TOKEN;

    }
    return apiGet(
        url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
        false,
        true,
    );
}

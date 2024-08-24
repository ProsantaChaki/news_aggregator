import {apiDelete, apiGet, apiPost, apiPut} from './axiosSetup';
import * as env from '../../../env.js';
import {
    LOGIN_URL,
    OTP_LOGIN_URL, TEST_API,

} from '../constantData/apiUrls.js';

import axios from "axios";

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
    let url = env.REACT_APP_NEWS_API_ORG_URL;
    if (queryParam){
        url = url+'/everything?'+queryParam+'&apiKey='+env.REACT_APP_NEWS_API_ORG_TOKEN;
    }else{
        url = url+'/everything?apiKey='+env.REACT_APP_NEWS_API_ORG_TOKEN;

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



export function newsYorkTimeApiCall(queryParam=false) {

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiPath = `${proxyUrl}https://newsapi.org/v2/everything?q=ne&sortBy=popularity&apiKey=ae0ffd5716c54771bd1d9a23f325c5e4`;

// Use this in your request
    return axios.get(apiPath);

    let url = env.REACT_APP_NEW_YORK_TIME_URL;
    if (queryParam){
        url = url+'?'+queryParam+'&api-key='+env.REACT_APP_NEW_YORK_TIME_TOKEN;
    }else{
        url = url+'?api-key='+env.REACT_APP_NEW_YORK_TIME_TOKEN;
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


export function newsApiCall() {

    let data = {
        "query": {
            "$query": {
                "$and": [
                    {"conceptUri": "http://en.wikipedia.org/wiki/Newspaper"},
                    {"$or": [
                            {"categoryUri": "dmoz/Business"},
                            {"categoryUri": "dmoz/Arts"},
                            {"categoryUri": "dmoz/Computers"},
                            {"categoryUri": "dmoz/Science"},
                            {"categoryUri": "dmoz/Sports"}
                        ]
                    }
                ]
            },
            "$filter": {"forceMaxDataTimeWindow": "31"}
        },
        "resultType": "articles",
        "articlesSortBy": "date",
        "apiKey": env.REACT_APP_NEWS_API_TOKEN
    }
    return apiPost(
        env.REACT_APP_NEWS_API_URL,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
        false,true
    );
}


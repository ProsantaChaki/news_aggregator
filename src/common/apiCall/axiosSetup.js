import {stringify} from 'qs';
import axiosRetry from 'axios-retry';
import {isDefined} from '../utilities';
import {API_BASE_URL} from '../constantData/constants';
import AxiosError from './exceptions/AxiosError';
import GeneralError from './exceptions/GeneralError';
import {
  LOGIN_URL,
  SIGNUP_URL,
} from '../constantData/apiUrls.js';
import axios from "axios";

const axiosInstance = axios.create();

axios.defaults.timeout = 300000;
axiosInstance.defaults.timeout = 300000;

axios.defaults.headers.common.Accept = 'application/json';
axiosInstance.defaults.headers.common.Accept = 'application/json';

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// disable cache
axiosInstance.defaults.headers.common['Cache-Control'] = 'no-cache';
axiosInstance.defaults.headers.common.Pragma = 'no-cache';
axiosInstance.defaults.headers.common.Expires = '0';


function setHeaders(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

/** Api Mocking ends */

function transformConfig(config, data) {
  let transformedData = data;
  if (
    config &&
    isDefined(config, 'headers') &&
    isDefined(config.headers, 'Content-Type') &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    transformedData = stringify(data);
  }
  return transformedData;
}

function handleFetchErrors(response) {
  if (!response.ok) {
    throw new AxiosError(response.statusText);
  }
  return response;
}

async function headerConfiguration(url, config, token=null)  {
  if (url !== LOGIN_URL && url !== SIGNUP_URL ) {

    //TODO: set access token
      token = token ? token : await localStorage.getItem("token")

        let authToken = `Bearer ${token}`;
        if (!axios.defaults.headers.common.Authorization) {
          axios.defaults.headers.common.Authorization = authToken;

          config.headers.Authorization = authToken;
        }

  }
  //console.log(config.headers, axios.defaults.headers.common)
  return new Promise(resolve => {
    resolve(config);
  });
}

/** Axios catch block handler */

const errorHandler = error => {
  if (error.response) {
    const {response} = error;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    if (response.status === 500) {
      throw new GeneralError(
        'Opps! There was a problem. Please try again later.',
        500,
      );
    }

    if (isDefined(response, 'data')) {
      if (isDefined(response.data, 'message')) {
        throw new AxiosError(response.data.message, response.status);
      }
      if (
        isDefined(response.data, 'errors') &&
        Array.isArray(response.data.errors)
      ) {
        throw new AxiosError(response.data.errors, response.status);
      }
      if (isDefined(response.data, 'errors')) {
        throw new AxiosError(response.data.errors, response.status);
      } else {
        throw new AxiosError(response.config, response.status);
      }
    }
    throw new GeneralError(
      'Opps! There was a problem. Please try again later.',
      response.status,
    );
  }
  if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js


    throw new GeneralError('SERVER_DOWN', 99999);
  }
  // Something happened in setting up the request that triggered an Error
  throw new GeneralError(
    'Opps! There was a problem. Please try again later.',
    400,
  );
};
function fetchReverseGeoCode(apiPath) {
  const axiosInsLocation = axios.create();
  axiosInsLocation.defaults.timeout = 300000;
  axiosRetry(axiosInsLocation, {retries: 3});
  return axiosInsLocation
    .get(apiPath)
    .then(response => response.data)
    .catch(errorHandler);
}

async function apiGet(
  apiPath,
  config = {},
  useMock = false,
  external = false,
  withCredentials = false,
) {
  const axiosToUse = useMock ? axiosInstance : axios;
  const fullUrl = useMock || external ? apiPath : API_BASE_URL + apiPath;
  const newConfig = await headerConfiguration(apiPath, config );
  axiosRetry(axiosToUse, {retries: 3});
  return await axiosToUse
    .get(fullUrl, newConfig)
    .then(response => response.data)
    .catch(errorHandler);
}

async function apiPost(
  apiPath,
  data,
  config = {},
  useMock = false,
  external = false,
  withCredentials = false,
) {
  const newConfig = await headerConfiguration(apiPath, config, data?.token ?? '');
  const transformedData = transformConfig(newConfig, data);
  const axiosToUse = useMock ? axiosInstance : axios;
  // const fullUrl = useMock ? apiPath : API_BASE_URL + apiPath;
  const fullUrl = useMock || external ? apiPath : API_BASE_URL + apiPath;

  return await axiosToUse
    .post(fullUrl, transformedData, newConfig)
    .then(response => response.data)
    .catch(errorHandler);
}

async function fetchRequest(apiPath, payload, config) {
  const temConfig = await headerConfiguration(apiPath, config, '');

  const newConfig = {
    credentials: 'same-origin',
    mode: 'cors',
    cache: 'no-cache',
    ...temConfig,
    body: JSON.stringify(payload),
  };

  const fullUrl = API_BASE_URL + apiPath;

  return await fetch(fullUrl, newConfig)
    .then(handleFetchErrors)
    .then(response => response.json());
}

async function apiPut(
  apiPath,
  data,
  config = {},
  useMock = false,
  withCredentials = true,
) {
  const newConfig = await headerConfiguration(apiPath, config, data?.token ?? '');
  const transformedData = transformConfig(newConfig, data);
  const axiosToUse = useMock ? axiosInstance : axios;
  const fullUrl = useMock ? apiPath : API_BASE_URL + apiPath;
  return await axiosToUse
    .put(fullUrl, transformedData, newConfig)
    .then(response => response.data)
    .catch(errorHandler);
}


async function apiDelete(apiPath, config = {}, withCredentials = true) {
  /*if (withCredentials) {
    config.withCredentials = true;
  }*/
  const newConfig = await headerConfiguration(apiPath, config, '');

  const fullUrl = API_BASE_URL + apiPath;
  return await axios
    .delete(fullUrl, newConfig)
    .then(response => response.data)
    .catch(errorHandler);
}

function apiGetFromExternalServer(apiPath) {
  const axiosToUse = axios;
  const fullUrl = apiPath;
  const newConfig = {};
  return axiosToUse
    .get(fullUrl, newConfig)
    .then(response => response.data)
    .catch(errorHandler);
}

export {
  fetchReverseGeoCode,
  apiGet,
  apiPost,
  apiPut,
  apiGetFromExternalServer,
  fetchRequest,
  handleFetchErrors,
  apiDelete,
  setHeaders,
};

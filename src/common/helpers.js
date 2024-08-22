import AxiosError from './apiCall/exceptions/AxiosError';
import {errorToast} from './toast';
import { PLAN_DURATION, PLAN_STORAGE, USER_TYPES } from './constantData/constants';

function catchBlockHandler(error, message = '', silent = false) {
  if (error instanceof AxiosError) {
    console.log(error.errors);
    if (silent) {
      return;
    }
    if (message) {
      errorToast(message);
    } else if (Array.isArray(error.errors) && error.errors.length) {
      error.errors.forEach((val) => {
        errorToast(val);
      });
    } else if (typeof error.errors === 'object' && error.errors !== null) {
      Object.keys(error.errors).forEach((key) => {
        console.log('key', error.errors[key]);
        errorToast(error.errors[key]);
      });
    } else {
      errorToast(error.errors);
    }
  } else {
    console.log(error.message);
    if (silent) {
      return;
    }
    errorToast(error.message);
  }
}


function getCurrentDate(day) {
  let today = new Date(new Date().setDate(new Date().getDate() + day));
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

function storageHelper(size){
  let storage = PLAN_STORAGE.filter((item)=> {

    return item.limit == size
  })
  return storage?.[0]?.name ?? size +' MB';
}

function durationHelper(size){
  let duration = PLAN_DURATION.filter((item)=> {
    return item.day == size
  })
  return duration?.[0]?.name ?? size +' days';
}

function userTypesName(size){
  let duration = USER_TYPES.filter((item)=> {
    return item.key == size

  })
  return duration?.[0]?.name ?? 'Not Identified';
}

function userRole(role, user_type){
  if(role=='SUPER_ADMIN'){
    return user_type==2 || user_type == 0
  }
  else if(role=='ADMIN'){
    return user_type==3 || user_type==2 || user_type == 0
  }
  else if(role=='LOCAL_ADMIN'){
    return user_type==3
  }
  else if(role=='LOCAL_USER'){
    return user_type==4
  }
  else if(role=='USER'){
    return user_type==5
  }
  return false
}

export {
  catchBlockHandler,
  getCurrentDate,
  storageHelper,
  durationHelper,
  userTypesName,
  userRole
};

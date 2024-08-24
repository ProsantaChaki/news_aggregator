import {
  IS_AUTHENTICATED,
  COMMON_MODAL_DATA_SET,
  LOADER_SHOW,
  LOADER_HIDE,
  UPDATE_IS_AUTHENTICATEED,
  TEST_DATA_UPDATE,
  NEWS_STORE
} from './GlobalActionTypes';

const initialState = {
  isAppOpen: false,
  isAuthenticated: false,
  commonModalOn: false,
  commonModalTitle: '',
  commonModalBody: '',
  commonModalButtonText: '',
  isLoading: false,
  testData:'welcome',
  news:[],
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case TEST_DATA_UPDATE:
      return {
        ...state,
        testData: payload.message
      }

    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload.status,
      };
    case COMMON_MODAL_DATA_SET:
      return {
        ...state,
        commonModalOn: payload.status,
        commonModalTitle: payload.title,
        commonModalBody: payload.body,
        commonModalButtonText: payload.buttonText,
      };

    case LOADER_SHOW:
      return {
        ...state,
        isLoading: true,
      };

    case LOADER_HIDE:
      return {
        ...state,
        isLoading: false,
      };

    case UPDATE_IS_AUTHENTICATEED:
      return {
        ...state,
        isAuthenticated: false,
      };
    case NEWS_STORE:
      return {
        ...state,
        news: payload?.news,
      };


    default:
      return state;
  }
}

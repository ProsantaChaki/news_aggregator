import {
  AUTH_SIGNUP_DATA_STORE,

} from './AuthActionTypes';

const initialState = {
  userProfile: {},
  signupData: null,
  isOtpRequired: false,
  deviceToken: '',
  userOrganization:{}
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {

    case AUTH_SIGNUP_DATA_STORE:
      return {
        ...state,
        signupData: payload,
      };

    default:
      return state;
  }
}

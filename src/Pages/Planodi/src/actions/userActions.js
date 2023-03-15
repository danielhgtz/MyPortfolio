import {
  USER_AUTH_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
  USER_GET_USER_SUCCESS,
} from "./actionTypes";

const userAuthError = () => {
  return {
    type: USER_AUTH_ERROR,
  };
};

const userLogoutSuccess = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

const userLoginSuccess = (token, user) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      token,
      userInfo: user,
    },
  };
};

const userGetUserSuccess = (token, user) => {
  return {
    type: USER_GET_USER_SUCCESS,
    payload: {
      token,
      userInfo: user,
    },
  };
};

export {
  userAuthError,
  userLogoutSuccess,
  userLoginSuccess,
  userGetUserSuccess,
};

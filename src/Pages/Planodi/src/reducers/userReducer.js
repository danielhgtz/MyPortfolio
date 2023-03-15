import {
  USER_AUTH_ERROR,
  USER_GET_USER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_GET_USER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("userToken", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        userInfo: payload.userInfo,
      };
    case USER_LOGOUT_SUCCESS:
    case USER_AUTH_ERROR:
      localStorage.removeItem("userToken");
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
      };
    default:
      return state;
  }
};

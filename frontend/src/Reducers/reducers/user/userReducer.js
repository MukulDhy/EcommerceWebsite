import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL,
} from "../../constants/user/userConstant";

export const userLoginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, status: false };
    case USER_LOGOUT_REQUEST:
      return { loading: true };
    case USER_LOGOUT_SUCCESS:
      return { loading: false };
    case USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegistrationReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true };
    case REGISTER_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload, status: false };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {...state, loading: true };
    // case USER_DETAILS_REQUEST:
    //   return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload, status: false };
    default:
      return state;
  }
};

export const userUpdateDetails = (state = { updatedUser: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_DETAILS_REQUEST:
      return {updateloading: true };
    // case USER_DETAILS_REQUEST:
    //   return { loading: true };
    case USER_UPDATE_DETAILS_SUCCESS:
      return { updateloading: false, updatedUser: action.payload };
    case USER_UPDATE_DETAILS_FAIL:
      return { updateloading: false, updateError: action.payload, status: false };
    default:
      return state;
  }
};

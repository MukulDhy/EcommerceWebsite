import axios from "axios";
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
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_DETAILS_REQUEST,
  USER_UPDATE_DETAILS_SUCCESS,
  USER_UPDATE_DETAILS_FAIL
} from "../../constants/user/userConstant";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `http://localhost:5000/api/users/login`,
      { email, password },
      config
    );

    console.log("Hellone = " + data);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfos", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });
    localStorage.removeItem("userInfos");
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "http://localhost:5000/api/users/register",
      { name, email, password },
      config
    );
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfos", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDetailAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    // const {userInfo} = getState().userLogin;
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Contnet-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/users/profile", config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const userUpdateDetailAction = (name,email,password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_DETAILS_REQUEST });
    // const {userInfo} = getState().userLogin;
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Contnet-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    // console.log(userInfo.token);
    const { data } = await axios.put("/api/users/profile",{name,email,password}, config);
    // console.log("awjdawbdjawbdjbawdbwaudbawuabdug21t736127351725371257")
    dispatch({ type: USER_UPDATE_DETAILS_SUCCESS, payload: data });
    dispatch({type : USER_LOGIN_SUCCESS,payload : data});
    localStorage.removeItem('userInfos');
    localStorage.setItem('userInfos',JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log(error);
  }
};



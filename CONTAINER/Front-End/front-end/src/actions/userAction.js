
import axios from 'axios';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_LOADING = 'REGISTER_LOADING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const USER_LOGOUT = 'USER_LOGOUT';

export const registerUser = (regCreds) => (dispatch) => {
  dispatch({ type: REGISTER_LOADING });
  axios
    .post('https://ft-potluck-planner-5.herokuapp.com/api/auth/register', regCreds)
    .then((res) => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch((err) => {
      dispatch({ type: REGISTER_FAILURE, payload: err.response.data.message });
    });
};

export const loginUser = (loginCreds) => (dispatch) => {
  window.localStorage.removeItem('token');
  dispatch({ type: LOGIN_LOADING });
  axios
    .post('https://ft-potluck-planner-5.herokuapp.com/api/auth/login', loginCreds)
    .then((res) => {
      window.localStorage.setItem('token', res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data.message });
    });
};

export const logoutUser = () => {
  window.localStorage.removeItem('token');
  return { type: USER_LOGOUT };
};
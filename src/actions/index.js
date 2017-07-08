import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERR, GET_DATA } from './types';

export const authError = function authError(err) {
  return {
    type: AUTH_ERR,
    payload: err,
  };
};

export const signinUser = function signinUser({ email, password }) {
  // submit email and password to server
  // if good then update state to indicate auth is good, save jwt token, redirect to route
  // if bad show error to user
  return function (dispatch) {
    axios.post('/api/signin', { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch((err) => {
        dispatch(authError('Bad Login Credentials'));
      });
  };
};


export const signoutUser = function signoutUser() {
  // need to destroy the token
  // set auth state to false
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER,
  };
};

export const signUpUser = function signUpUser({ email, password }) {
  return function (dispatch) {
    axios
      .post('/api/signup', { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch((error) => {
        dispatch(authError(error.response.data.error));
      });
  };
};

export const getData = function getData() {
  return function (dispatch) {
    axios
      .get('/api/secretroute',
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        dispatch({ type: GET_DATA, payload: response.data.message });
      })
      .catch((error) => {
        dispatch(authError('Invalid credentials'));
      });
  };
};

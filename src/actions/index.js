import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERR } from './types';
const API_URL = process.env.IP || 'http://localhost:3000';

export function signinUser({ email, password }) {
  // submit email and password to server
  // if good then update state to indicate auth is good, save jwt token, redirect to route
  // if bad show error to user
  return function(dispatch) {
    axios.post(`/api/signin`, { email, password })
          .then((response) => {
            dispatch({type: AUTH_USER});
            localStorage.setItem('token', response.data.token);
            browserHistory.push('/feature');
          })
          .catch((err) => {
            dispatch(authError('Bad Login Credentials'))
          })
  }
}

export function authError(err) {
  return {
    type: AUTH_ERR,
    payload: err
  }
}

export function signoutUser() {
  // need to destroy the token
  // set auth state to false
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function signUpUser({ email, password }) {
  return function (dispatch) {
    axios.post('/api/signup', { email, password })
      .then((response) => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch((error) => {
        dispatch(authError(error.response.data.error))
      })
  }
}
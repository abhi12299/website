import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import { loggedOutToast } from '../../utils/toasts';
import { LOADING, LOGIN, ERROR, /* RESET, */ LOGOUT } from '../types';

const authenticate = req => {
  const fetchOpts = {
    method: 'GET',
    credentials: 'include'
  };
  if (req && 'token' in req.cookies) {
    fetchOpts.headers = {
      'authorization': `Bearer ${req.cookies['token']}`
    };
  }

  return dispatch => {
    dispatch({ type: LOADING });
    
    return fetch('http://localhost:3001/auth/verify', fetchOpts)
        .then(res => res.json())
        .then(resp => {
            if (resp.valid) {
                dispatch({ type: LOGIN, payload: true });
            } else if (resp.emptyToken === false) {
                dispatch({ type: ERROR, payload: 'Invalid user token! You will be logged out!', initiateForceLogout: true });
            } else if (resp.emptyToken === true) {
              dispatch({ type: ERROR, payload: 'You must be logged in!' });
            }
        }).catch(err => {
            console.error(err);
            dispatch({ type: ERROR, payload: 'Something went wrong! You will be logged out!', initiateForceLogout: true });
        });
  };
};

// const reset = () => {
//   return dispatch => {
//     dispatch({ type: RESET });
//   }
// }

const logout = () => {
  return dispatch => {
    dispatch({ type: LOADING });
    return fetch('http://localhost:3001/auth/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(resp => {
        loggedOutToast(resp.loggedOut);
        dispatch({ type: LOGOUT });
        Router.push('/');
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: LOGOUT });
        Router.push('/');
      });
  }
}

export default {
  authenticate,
  logout,
  // reset,
};

import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import { showToast } from '../../utils/toasts';
import { LOADING, LOGIN, ERROR, /* RESET, */ LOGOUT } from '../types';
import baseURL from '../../constants/apiURL';

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
    
    return fetch(baseURL + '/auth/verify', fetchOpts)
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
    return fetch(baseURL + '/auth/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.loggedOut) {
          showToast('You have been logged out!', 'success');
        }
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

import fetch from 'isomorphic-unfetch';

import { LOADING, LOGIN, ERROR, LOGOUT } from '../types';

const authenticate = req => {
  const fetchOpts = {
    method: 'GET',
    credentials: 'include'
  };
  if (req) {
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
            } else {
                dispatch({ type: ERROR, payload: 'Invalid user token! You will be logged out!', initiateForceLogout: true });
            }
        }).catch(err => {
            console.error(err);
            dispatch({ type: ERROR, payload: 'Something went wrong! You will be logged out!', initiateForceLogout: true });
        });
  };
};

export default {
  authenticate
};

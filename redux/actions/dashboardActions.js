import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import { POSTSAVING, POSTSLOADING, POSTSERROR, POSTSSUCCESS, ERROR, LOGIN } from '../types';
import baseURL from '../../constants/apiURL';
import { showToast } from '../../utils/toasts';
import removePostFromLS from '../../utils/removePostFromLS';

const savePost = postData => {
  const fetchOpts = {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  };
  return dispatch => {
    dispatch({ type: POSTSAVING, payload: true });
    
    return fetch(baseURL + '/api/dashboard/savePost', fetchOpts)
        .then(res => {
          // means we're unauthorized
          if (res.status === 401) {
            return Promise.resolve({
              error: true,
              forceLogout: true,
              msg: 'You are not authorized!'
            });
          }
          return res.json();
        })
        .then(resp => {
          if (resp.error) {
            console.error(resp);

            if (resp.forceLogout) {
              dispatch({ type: ERROR, payload: 'Invalid user token! You will be logged out!', initiateForceLogout: true });
              // to remove admin=true from store
              // so error page renders in withAuth
              // dispatch({ type: LOGIN, payload: false });
            } else {
              dispatch({ type: POSTSAVING, payload: false });
              showToast(resp.msg || 'There was some error submitting the post!', 'error');
            }
          } else {
            showToast('Post was submitted successfully!', 'success', {
              timeOut: 1000,
              extendedTimeout: 1000
            })
            .then(() => {
                dispatch({ type: POSTSAVING, payload: false });
                removePostFromLS();
                Router.push('/dashboard/posts');
            });
          }
        }).catch(err => {
            console.error(err);
            dispatch({ type: POSTSAVING, payload: false });
            showToast('There was some error submitting the post!', 'error');
        });
  };
};

const fetchPosts = ({ req, filters }) => {
  const fetchOpts = {
    method: 'GET',
    credentials: 'include',
  };
  if (req && 'token' in req.cookies) {
    fetchOpts.headers = {
      'authorization': `Bearer ${req.cookies['token']}`
    };
  }

  return dispatch => {
    dispatch({ type: POSTSLOADING, payload: true });
    
    return fetch(baseURL + '/api/dashboard/getPosts', fetchOpts)
        .then(res => res.json())
        .then(resp => {
          if (resp.error) {
            console.error(resp);
            dispatch({ type: POSTSERROR, payload: 'Something went wrong while fetching the posts.' });
          } else {
            dispatch({ type: POSTSSUCCESS, payload: resp.data });
          }
        }).catch(err => {
            console.error(err);
            dispatch({ type: POSTSERROR, payload: 'Something went wrong while fetching the posts.' });
        });
  };
};

export default {
    savePost,
    fetchPosts
};

import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import { POSTSAVING } from '../types';
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
        .then(res => res.json())
        .then(resp => {
          if (resp.error) {
            console.error(resp);
            dispatch({ type: POSTSAVING, payload: false });
            showToast(resp.msg || 'There was some error submitting the post!', 'error');
          } else {
            showToast('Post was submitted successfully!', 'success', {
              timeOut: 1000,
              extendedTimeout: 1000
            })
            .then(() => {
                dispatch({ type: POSTSAVING, payload: false });
                removePostFromLS();
                Router.push('/dashboard');
            });
          }
        }).catch(err => {
            console.error(err);
            dispatch({ type: POSTSAVING, payload: false });
            showToast('There was some error submitting the post!', 'error');
        });
  };
};

export default {
    savePost
};

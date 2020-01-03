import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import { POSTSAVING, 
  POSTSLOADING, 
  POSTSERROR, 
  POSTSSUCCESS, 
  ERROR,
  TOGGLEPOSTSUCCESS,
  MEDIALOADING,
  MEDIAERROR,
  MEDIASUCCESS,
  DELETEMEDIALOADING
} from '../types';
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

const fetchPosts = ({ req, filters, perPage=10, pageNo=1 }) => {
  const fetchOpts = {
    method: 'GET',
    credentials: 'include',
  };
  if (req && 'token' in req.cookies) {
    fetchOpts.headers = {
      'authorization': `Bearer ${req.cookies['token']}`
    };
  }
  let appendToQuery = false;
  let url = `${baseURL}/api/dashboard/getPosts`;
  if (perPage) {
    appendToQuery = true;
    url += `?limit=${perPage}`;
  }
  if (pageNo) {
    url += `${appendToQuery ? '&' : '?'}skip=${(pageNo-1) * perPage}`;
    appendToQuery = true;
  }
  return dispatch => {
    dispatch({ type: POSTSLOADING, payload: true });
    
    return fetch(url, fetchOpts)
        .then(res => res.json())
        .then(resp => {
          if (resp.error) {
            console.error(resp);
            dispatch({ type: POSTSERROR, payload: 'Something went wrong while fetching the posts.' });
          } else {
            dispatch({ type: POSTSSUCCESS, payload: { data: resp.data, count: resp.count } });
          }
        }).catch(err => {
            console.error(err);
            dispatch({ type: POSTSERROR, payload: 'Something went wrong while fetching the posts.' });
        });
  };
};

const fetchMedia = ({ req, filters, perPage=10, pageNo=1 }) => {
  const fetchOpts = {
    method: 'GET',
    credentials: 'include',
  };
  if (req && 'token' in req.cookies) {
    fetchOpts.headers = {
      'authorization': `Bearer ${req.cookies['token']}`
    };
  }
  let appendToQuery = false;
  let url = `${baseURL}/api/dashboard/getMedia`;
  if (perPage) {
    appendToQuery = true;
    url += `?limit=${perPage}`;
  }
  if (pageNo) {
    url += `${appendToQuery ? '&' : '?'}skip=${(pageNo-1) * perPage}`;
    appendToQuery = true;
  }
  return dispatch => {
    dispatch({ type: MEDIALOADING, payload: true });
    
    return fetch(url, fetchOpts)
        .then(res => res.json())
        .then(resp => {
          if (resp.error) {
            console.error(resp);
            dispatch({ type: MEDIAERROR, payload: 'Something went wrong while fetching the posts.' });
          } else {
            dispatch({ type: MEDIASUCCESS, payload: { data: resp.data, count: resp.count } });
          }
        }).catch(err => {
            console.error(err);
            dispatch({ type: MEDIAERROR, payload: 'Something went wrong while fetching the posts.' });
        });
  };
};

const togglePublish = (postData) => {
  const { _id, published } = postData;
  const fetchOpts = {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id, published })
  };
  return dispatch => {
    return fetch(baseURL + '/api/dashboard/setPublished', fetchOpts)
      .then(res => {
        if (res.status === 401) {
          return Promise.resolve({
            error: true,
            forceLogout: true,
            msg: 'You are not authorized!'
          });
        }
        return res.json();
      }).then(resp => {
        if (resp.error) {
          console.error(resp);
          if (resp.forceLogout) {
            dispatch({ type: ERROR, payload: 'Invalid user token! You will be logged out!', initiateForceLogout: true });
            // to remove admin=true from store
            // so error page renders in withAuth
            // dispatch({ type: LOGIN, payload: false });
          } else {
            showToast(resp.msg || 'There was some error changing the publish status of the post!', 'error');
          }
        } else {
          dispatch({ type: TOGGLEPOSTSUCCESS, payload: { _id, published } });
          showToast(`The post was successfully ${published ? 'published': 'unpublished'}.`, 'success');
        }
      }).catch(err => {
        console.error(err);
        showToast('There was some error changing the publish status of the post!', 'error');
    });;
  }
};

const deleteMedia = _id => {
  const fetchOpts = {
    method: 'DELETE',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ _id })
  };
  return dispatch => {
    dispatch({ type: DELETEMEDIALOADING, payload: true });
    return fetch(baseURL + '/api/dashboard/deleteMedia', fetchOpts)
      .then(res => {
        if (res.status === 401) {
          return Promise.resolve({
            error: true,
            forceLogout: true,
            msg: 'You are not authorized!'
          });
        }
        return res.json();
      }).then(resp => {
        if (resp.error) {
          console.error(resp);
          if (resp.forceLogout) {
            dispatch({ type: ERROR, payload: 'Invalid user token! You will be logged out!', initiateForceLogout: true });
            // to remove admin=true from store
            // so error page renders in withAuth
            // dispatch({ type: LOGIN, payload: false });
          } else {
            showToast(resp.msg || 'There was some error deleting the media!', 'error');
            dispatch({ type: DELETEMEDIALOADING, payload: false });
          }
        } else {
          showToast('The post was successfully deleted.', 'success', {
            timeOut: 1000,
            extendedTimeout: 1000
          }).then(() => {
            window.location.reload(true);
          });
        }
      }).catch(err => {
        console.error(err);
        showToast('There was some error deleting the media!', 'error');
        dispatch({ type: DELETEMEDIALOADING, payload: false });
    });
  }
};

export default {
    savePost,
    fetchPosts,
    togglePublish,
    fetchMedia,
    deleteMedia
};

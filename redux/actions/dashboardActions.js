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
  DELETEMEDIALOADING,
  FETCHPOSTLOADING,
  FETCHPOSTSUCCESS,
  FETCHPOSTERROR  ,
  TOGGLEPOSTSUCCESS_SEARCH
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
  if (filters) {
    for (const [key, val] of Object.entries(filters)) {
      url += `${appendToQuery ? '&' : '?'}${key}=${val}`;
      appendToQuery = true;
    }
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
  if (filters) {
    for (const [key, val] of Object.entries(filters)) {
      url += `${appendToQuery ? '&' : '?'}${key}=${val}`;
      appendToQuery = true;
    }
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

const togglePublish = (postData, pathname='/dashboard/posts') => {
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
          dispatch({ type: pathname === '/dashboard/posts' ? TOGGLEPOSTSUCCESS : TOGGLEPOSTSUCCESS_SEARCH, payload: { _id, published } });
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

const fetchPost = ({ req, _id }) => {
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
    dispatch({ type: FETCHPOSTLOADING, payload: true });
    return fetch(baseURL + `/api/dashboard/getPost?id=${_id}`, fetchOpts)
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
            dispatch({ type: FETCHPOSTERROR, payload: 'There was some error!' });
          }
        } else {
          dispatch({ type: FETCHPOSTSUCCESS, payload: resp.data })
        }
      }).catch(err => {
        console.error(err);
        dispatch({ type: FETCHPOSTERROR, payload: 'Something went wrong while fetching the post!' });
    });
  }
};

const editPost = (postData, keyName, keepOldId=true) => {
  const fetchOpts = {
    method: 'PATCH',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...postData, keepOldId })
  };
  console.log('REQ going for body:', JSON.stringify({ keepOldId, ...postData }, null, 2));
  return dispatch => {
    dispatch({ type: POSTSAVING, payload: true });
    
    return fetch(baseURL + '/api/dashboard/editPost', fetchOpts)
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
              showToast(resp.msg || 'There was some error updating the post!', 'error');
            }
          } else {
            showToast('Post was updated successfully!', 'success', {
              timeOut: 1000,
              extendedTimeout: 1000
            })
            .then(() => {
                dispatch({ type: POSTSAVING, payload: false });
                if (keyName) {
                  removePostFromLS(keyName);
                } else {
                  removePostFromLS();
                }
                Router.push('/dashboard/posts');
            });
          }
        }).catch(err => {
            console.error(err);
            dispatch({ type: POSTSAVING, payload: false });
            showToast('There was some error updating the post!', 'error');
        });
  };
};

// changes the dashboardPost.loading value
const changePostSaveLoading = newLoading => {
  return dispatch => {
    dispatch({ type: POSTSAVING, payload: newLoading });
  }
};

export default {
    savePost,
    fetchPosts,
    togglePublish,
    fetchMedia,
    deleteMedia,
    fetchPost,
    editPost,
    changePostSaveLoading
};

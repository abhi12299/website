import fetch from 'isomorphic-unfetch';

import {
    POSTLOADING,
    POSTSUCCESS,
    POSTERROR,
    TOGGLEPOSTSUCCESS_SINGLEPOST,
    POSTSLOADING,
    POSTSERROR,
    POSTSSUCCESS
} from '../types';

import baseURL from '../../constants/apiURL';

const getPost = ctx => {
    const path = ctx.req ? ctx.req.path : ctx.asPath;
    const id = path.split('/')[2];

    const fetchOpts = {
        method: 'GET',
        credentials: 'include',
    };

    if (ctx.req && 'token' in ctx.req.cookies) {
        fetchOpts.headers = {
            'authorization': `Bearer ${ctx.req.cookies['token']}`
        };
    }

    let url = `${baseURL}/api/post/getPost?id=${id}`;

    return dispatch => {
        dispatch({ type: POSTLOADING, payload: true });

        return fetch(url, fetchOpts)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.error) {
                    console.error(resp);
                    dispatch({ type: POSTERROR, payload: resp.msg || 'Something went wrong!' });
                } else {
                    dispatch({ type: POSTSUCCESS, payload: resp.data });
                }
            }).catch(err => {
                console.error(err);
                dispatch({ type: POSTERROR, payload: err.msg || 'Something went wrong!' });
            });
    };
};

const getLatestPosts = () => {
    const fetchOpts = {
        method: 'GET',
        credentials: 'include',
    };
    let url = `${baseURL}/api/post/getLatestPosts`;

    return dispatch => {
        dispatch({ type: POSTSLOADING, payload: true });

        return fetch(url, fetchOpts)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.error) {
                    console.error(resp);
                    dispatch({ type: POSTSERROR, payload: resp.msg || 'Something went wrong!' });
                } else {
                    dispatch({ type: POSTSSUCCESS, payload: { data: resp.data } });
                }
            }).catch(err => {
                console.error(err);
                dispatch({ type: POSTSERROR, payload: err.msg || 'Something went wrong!' });
            });
    };
};

export default {
    getPost,
    getLatestPosts
};

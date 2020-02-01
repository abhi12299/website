import fetch from 'isomorphic-unfetch';

import {
    POSTLOADING,
    POSTSUCCESS,
    POSTERROR,
    TOGGLEPOSTSUCCESS_SINGLEPOST,
    POSTSLOADING,
    POSTSERROR,
    POSTSSUCCESS,
    LATESTPOSTSUCCESS,
    LATESTPOSTSLOADING,
    LATESTPOSTERROR
} from '../types';

import baseURL from '../../constants/apiURL';

const getPost = ctx => {
    const path = ctx.req ? ctx.req.path : ctx.asPath;
    const id = path.split('/')[2];

    const store = ctx.store.getState()
    if (store.blogPost.data && store.blogPost.data._id === id) {
        return () => ({});
    }
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
        dispatch({ type: LATESTPOSTSLOADING, payload: true });

        return fetch(url, fetchOpts)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.error) {
                    console.error(resp);
                    dispatch({ type: LATESTPOSTERROR, payload: resp.msg || 'Something went wrong!' });
                } else {
                    dispatch({ type: LATESTPOSTSUCCESS, payload: { latestPosts: resp.data } });
                }
            }).catch(err => {
                console.error(err);
                dispatch({ type: LATESTPOSTERROR, payload: err.msg || 'Something went wrong!' });
            });
    };
};

const getAllPosts = (ctx, perPage=10) => {
    let {
        page, keywords
    } = ctx.req ? ctx.req.query : ( ctx.query ? ctx.query : {});

    page = page ? (isNaN(parseInt(page)) ? 1 : parseInt(page))  : 1;
    page = page > 0 ? page : 1;

    const fetchOpts = {
        method: 'GET',
        credentials: 'include',
    };

    if (ctx.req && 'token' in ctx.req.cookies) {
        fetchOpts.headers = {
            'authorization': `Bearer ${ctx.req.cookies['token']}`
        };
    }

    let url = `${baseURL}/api/post/getAllPosts`;
    let appendToQuery = false;
    if (keywords) {
        appendToQuery = true;

        url += '?';
        if (Array.isArray(keywords)) {
            for (let i = 0; i < keywords.length; i++) {
                url += `${i === 0 ? '' : '&'}keywords=${keywords[i]}`;
            }
        } else {
            url += `keywords=${keywords}`;
        }
    }
    if (perPage) {
        url += `${appendToQuery ? '&' : '?'}limit=${perPage}`;
        appendToQuery = true;
    }
    if (page) {
        url += `${appendToQuery ? '&' : '?'}skip=${(page-1) * perPage}`;
    }

    return dispatch => {
        dispatch({ type: POSTSLOADING, payload: true });

        return fetch(url, fetchOpts)
            .then(res => res.json())
            .then(resp => {
                if (resp.error) {
                    console.error(resp);
                    dispatch({ type: POSTSERROR, payload: resp.msg || 'Something went wrong!' });
                } else {
                    dispatch({ type: POSTSSUCCESS, payload: { data: resp.data, count: resp.count } });
                }
            }).catch(err => {
                console.error(err);
                dispatch({ type: POSTSERROR, payload: err.msg || 'Something went wrong!' });
            });
    };
};

export default {
    getPost,
    getLatestPosts,
    getAllPosts
};

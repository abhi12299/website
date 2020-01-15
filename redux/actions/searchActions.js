import fetch from 'isomorphic-unfetch';

import {
    SEARCHSUGGESTIONSERROR,
    SEARCHSUGGESTIONSLOADING,
    SEARCHSUGGESTIONSUCCESS,
    ERROR,
    SEARCHLOADING,
    SEARCHERROR,
    SEARCHSUCCESS
} from '../types';

import baseURL from '../../constants/apiURL';

const search = (ctx, perPage=10) => {
    let {
        q,
        sortOrder='-1',
        published='1',
        sortBy='postedDate',
        page
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

    let url = `${baseURL}/api/search/search?q=${q}`;
    if (sortBy) {
        url += `&sortBy=${sortBy}`;
    }
    if (sortOrder) {
        url += `&sortOrder=${sortOrder}`;
    }
    if (published) {
        url += `&published=${published}`;
    }
    if (perPage) {
        url += `&limit=${perPage}`;
    }
    if (page) {
        url += `&skip=${(page-1) * perPage}`;
    }

    return dispatch => {
        dispatch({ type: SEARCHLOADING, payload: true });

        return fetch(url, fetchOpts)
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
                        dispatch({ type: SEARCHERROR, payload: resp.msg || 'Something went wrong!' });
                    }
                } else {
                    dispatch({ type: SEARCHSUCCESS, payload: resp.data, count: resp.count, searchQuery: q });
                }
            }).catch(err => {
                console.error(err);
                dispatch({ type: SEARCHERROR, payload: err.msg || 'Something went wrong!' });
            });
    };
};

const searchSuggestions = ({ q, sortBy, sortOrder, published }) => {
    const fetchOpts = {
        method: 'GET',
        credentials: 'include',
    };

    let url = `${baseURL}/api/search/suggestions?q=${q}`;
    if (sortBy) {
        url += `&sortBy=${sortBy}`;
    }
    if (sortOrder) {
        url += `&sortOrder=${sortOrder}`;
    }
    if (published) {
        url += `&published=${published}`;
    }

    return dispatch => {
        dispatch({ type: SEARCHSUGGESTIONSLOADING, payload: true });

        return fetch(url, fetchOpts)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.error) {
                    console.error(resp);
                    dispatch({ type: SEARCHSUGGESTIONSERROR, payload: resp.msg || 'Something went wrong!' });
                } else {
                    dispatch({ type: SEARCHSUGGESTIONSUCCESS, payload: resp.data, searchQuery: q });
                }
            }).catch(err => {
                console.error(err);
                dispatch({ type: SEARCHSUGGESTIONSERROR, payload: 'Something went wrong!' });
            });
    };
};

const clearSearchSuggestions = () => dispatch => {
    dispatch({ type: SEARCHSUGGESTIONSUCCESS, payload: null, searchQuery: '' });
}

export default {
    searchSuggestions,
    clearSearchSuggestions,
    search
};

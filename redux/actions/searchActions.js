import fetch from 'isomorphic-unfetch';

import {
    SEARCHSUGGESTIONSERROR,
    SEARCHSUGGESTIONSLOADING,
    SEARCHSUGGESTIONSUCCESS
} from '../types';

import baseURL from '../../constants/apiURL';

const searchSuggestions = ({ q, sortBy, sortOrder, published }) => {
    const fetchOpts = {
        method: 'GET',
        credentials: 'include',
    };
    if (req && 'token' in req.cookies) {
        fetchOpts.headers = {
            'authorization': `Bearer ${req.cookies['token']}`
        };
    }

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
            .then(resp => {
                console.log('From api resp is', resp);
                if (resp.error) {
                    console.error(resp);
                    dispatch({ type: SEARCHSUGGESTIONSERROR, payload: resp.msg || 'Something went wrong!' });
                } else {
                    dispatch({ type: SEARCHSUGGESTIONSUCCESS, payload: resp.data });
                }
            }).catch(err => {
                console.error(err);
                dispatch({ type: SEARCHSUGGESTIONSERROR, payload: resp.msg || 'Something went wrong!' });
            });
    };
};


export default {
    searchSuggestions
};

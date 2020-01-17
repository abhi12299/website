import {
    POSTLOADING,
    POSTSUCCESS,
    POSTERROR,
    TOGGLEPOSTSUCCESS_SINGLEPOST
} from '../types';

const initialState = {
    loading: false,
    errorMessage: null,
    error: false,
    data: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case POSTLOADING:
            return Object.assign({}, state, { loading: action.payload });
        case POSTSUCCESS:
            return Object.assign({}, state, { loading: false, data: action.payload });
        case POSTERROR:
            return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
        case TOGGLEPOSTSUCCESS_SINGLEPOST:
            const { published } = action.payload;
            const { data } = state;
            return Object.assign({}, state, { data: {...data, published} });
        default:
            return state;
    }
};

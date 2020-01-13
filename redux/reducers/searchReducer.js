import {
    SHOWPOSTSEARCHOVERLAY,
    SEARCHSUGGESTIONSUCCESS,
    SEARCHSUGGESTIONSLOADING,
    SEARCHSUGGESTIONSERROR
} from '../types';

const initialState = {
    show: false,
    loading: false,
    errorMessage: null,
    error: false,
    data: null,
    count: 0,
    suggestions: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOWPOSTSEARCHOVERLAY:
            return Object.assign({}, state, { show: action.payload });
        case SEARCHSUGGESTIONSLOADING:
            return Object.assign({}, state, { loading: action.payload });
        case SEARCHSUGGESTIONSUCCESS:
            return Object.assign({}, state, { loading: false, suggestions: action.payload });
        case SEARCHSUGGESTIONSERROR:
            return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
        default:
            return state;
    }
};

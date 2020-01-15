import {
    SHOWPOSTSEARCHOVERLAY,
    SEARCHSUGGESTIONSUCCESS,
    SEARCHSUGGESTIONSLOADING,
    SEARCHSUGGESTIONSERROR,
    SEARCHERROR,
    SEARCHLOADING,
    SEARCHSUCCESS,
    TOGGLEPOSTSUCCESS_SEARCH
} from '../types';

const initialState = {
    show: false,
    loading: false,
    errorMessage: null,
    error: false,
    count: null,
    suggestions: null,
    searchQuery: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOWPOSTSEARCHOVERLAY:
            return Object.assign({}, state, { show: action.payload });
        case SEARCHSUGGESTIONSLOADING:
            return Object.assign({}, state, { loading: action.payload });
        case SEARCHSUGGESTIONSUCCESS:
            return Object.assign({}, state, { loading: false, suggestions: action.payload, searchQuery: action.searchQuery });
        case SEARCHSUGGESTIONSERROR:
            return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload, suggestions: null });
        case SEARCHLOADING:
            return Object.assign({}, state, { loading: action.payload });
        case SEARCHSUCCESS:
            return Object.assign({}, state, { loading: false, searchResults: action.payload, count: action.count, searchQuery: action.searchQuery });
        case SEARCHERROR:
            return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload, searchResults: null });
        case TOGGLEPOSTSUCCESS_SEARCH:
            const { _id, published } = action.payload;
            let data = state.searchResults;
            if (data) {
                data = data.map(d => {
                    if (d._id === _id) {
                        d.published = published;
                    }
                    return d;
                });
            }
            return Object.assign({}, state, { searchResults: data });
        default:
            return state;
    }
};

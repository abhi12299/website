import {
    MEDIALOADING, 
    MEDIASUCCESS,
    MEDIAERROR,
    DELETEMEDIALOADING
} from '../types';

const initialState = {
    loading: false,
    errorMessage: null,
    error: false,
    data: null,
    count: 0,
    deleteMediaLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
      case MEDIALOADING:
        return Object.assign({}, state, { loading: action.payload });
      case MEDIAERROR:
        return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
      case MEDIASUCCESS:
        return Object.assign({}, state, { error: false, loading: false, errorMessage: null, ...action.payload });
      case DELETEMEDIALOADING:
        return Object.assign({}, state, { deleteMediaError: false, deleteMediaLoading: action.payload });
      default:
        return state;
    }
};
  
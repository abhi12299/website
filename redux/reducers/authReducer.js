import { LOADING, LOGIN, ERROR } from '../types';

const initialState = {
  admin: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { loading: true });
    case LOGIN:
      return Object.assign({}, state, { admin: action.payload, loading: false });
    case ERROR:
      return Object.assign({}, state, { loading: false, errorMessage: action.payload });
    default:
      return state;
  }
};

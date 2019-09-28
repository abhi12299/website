import { LOADING, LOGIN, ERROR } from '../types';

const initialState = {
  admin: null,
  loading: false,
  initiateForceLogout: false,
  errorMessage: '',
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { loading: true });
    case LOGIN:
      return Object.assign({}, state, { admin: action.payload, loading: false });
    case ERROR:
      return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload, initiateForceLogout: action.initiateForceLogout });
    default:
      return state;
  }
};

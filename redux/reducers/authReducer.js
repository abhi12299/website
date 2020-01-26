import { LOADING, LOGIN, ERROR, /*RESET,*/ LOGOUT } from '../types';

const initialState = {
  admin: null,
  loading: true,
  initiateForceLogout: false,
  errorMessage: '',
  error: false,
  loggedOut: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, { loading: true });
    case LOGIN:
      return Object.assign({}, state, { admin: action.payload, loading: false });
    case LOGOUT:
      return Object.assign({}, state, { admin: null, loading: false, loggedOut: true, error: false, initiateForceLogout: false, errorMessage: null });
    case ERROR:
      return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload, initiateForceLogout: action.initiateForceLogout });
    // case RESET:
    //     return Object.assign({}, state, { error: false, loading: false, errorMessage: null, initiateForceLogout: false, admin: null, loggedOut: null });
    default:
      return state;
  }
};

import { 
    POSTSERROR,
    POSTSLOADING, 
    POSTSSUCCESS
} from '../types';

const initialState = {
  loading: false,
  errorMessage: null,
  error: false,
  data: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTSLOADING:
      return Object.assign({}, state, { loading: action.payload });
    case POSTSERROR:
      return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
    case POSTSSUCCESS:
        return Object.assign({}, state, { error: false, loading: false, errorMessage: null, data: action.payload });
    default:
      return state;
  }
};

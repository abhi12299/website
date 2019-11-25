import { 
    POSTSERROR,
    POSTSLOADING, 
    POSTSSUCCESS,
    TOGGLEPOSTSUCCESS
} from '../types';

const initialState = {
  loading: false,
  errorMessage: null,
  error: false,
  data: null,
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTSLOADING:
      return Object.assign({}, state, { loading: action.payload });
    case POSTSERROR:
      return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
    case POSTSSUCCESS:
      return Object.assign({}, state, { error: false, loading: false, errorMessage: null, ...action.payload });
    case TOGGLEPOSTSUCCESS:
      const { _id, published } = action.payload;
      let data = state.data;
      if (data) {
        data = data.map(d => {
          if (d._id === _id) {
            d.published = published;
          }
          return d;
        });
      }
      return Object.assign({}, state, { data });
    default:
      return state;
  }
};

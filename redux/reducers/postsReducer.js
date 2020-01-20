import { 
    POSTSERROR,
    POSTSLOADING, 
    POSTSSUCCESS,
    TOGGLEPOSTSUCCESS,
    LATESTPOSTERROR,
    LATESTPOSTSLOADING,
    LATESTPOSTSUCCESS
} from '../types';

const initialState = {
  loading: false,
  errorMessage: null,
  error: false,
  data: null,
  count: 0,
  latestPostLoading: false,
  latestPosts: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTSLOADING:
      return Object.assign({}, state, { loading: action.payload });
    case POSTSERROR:
      return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
    case POSTSSUCCESS:
      return Object.assign({}, state, { error: false, loading: false, errorMessage: null, ...action.payload });
    case LATESTPOSTSUCCESS:
      return Object.assign({}, state, { latestPostError: false, latestPostLoading: false, errorMessage: null, ...action.payload });
    case LATESTPOSTERROR:
      return Object.assign({}, state, { latestPostError: true, latestPostLoading: false, errorMessage: action.payload });
    case LATESTPOSTSLOADING:
      return Object.assign({}, state, { latestPostLoading: action.payload });
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

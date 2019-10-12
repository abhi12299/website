import { 
    DASHBOARDPOSTERROR,
    DASHBOARDPOSTLOADING, 
    SETTITLE, 
    SETBODY, 
    SETHEADERIMAGE, 
    SAVEPOST, 
    SETMETATAGS,
    RESTOREPOST 
} from '../types';

const initialState = {
  loading: false,
  errorMessage: null,
  error: false,
  title: 'Untitled Post',
  body: 'Write something awesome!',
  headerImage: '',
  metaTags: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARDPOSTLOADING:
      return Object.assign({}, state, { loading: true });
    case SETTITLE:
      return Object.assign({}, state, { title: action.payload });
    case SETBODY:
      return Object.assign({}, state, { body: action.payload });
    case DASHBOARDPOSTERROR:
      return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
    case SETHEADERIMAGE:
      return Object.assign({}, state, { headerImage: action.payload });
    case SETMETATAGS:
      return Object.assign({}, state, { metaTags: action.payload });
    default:
      return state;
  }
};

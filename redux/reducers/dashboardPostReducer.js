import { 
    DASHBOARDPOSTERROR,
    DASHBOARDPOSTLOADING, 
    SETTITLE, 
    SETBODY, 
    SETHEADERIMAGE, 
    SAVEPOST,
    RESTOREPOST,
    SETMETADESC ,
    SETMETAKEYWORDS
} from '../types';

const initialState = {
  loading: false,
  errorMessage: null,
  error: false,
  title: 'Untitled Post',
  body: 'Write something awesome!',
  headerImage: '',
  metaDescription: null,
  metaKeywords: null
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
    case SETMETADESC:
      return Object.assign({}, state, { metaDescription: action.payload });
    case SETMETAKEYWORDS:
      return Object.assign({}, state, { metaKeywords: action.payload });
    default:
      return state;
  }
};

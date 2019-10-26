import { 
    DASHBOARDPOSTERROR,
    DASHBOARDPOSTLOADING, 
    SETTITLE, 
    SETBODY, 
    SETHEADERIMAGE, 
    SAVEPOST,
    RESTOREPOST,
    SETMETADESC ,
    SETMETAKEYWORDS,
    POSTSAVING
} from '../types';

import backupToLS from '../../utils/backupToLS';

const initialState = {
  loading: false,
  errorMessage: null,
  error: false,
  title: 'Untitled Post',
  body: 'Write something awesome!',
  headerImage: '',
  metaDescription: null,
  metaKeywords: null,
  saving: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARDPOSTLOADING:
      return Object.assign({}, state, { loading: true });
    case SETTITLE:
      backupToLS('title', action.payload);
      return Object.assign({}, state, { title: action.payload });
    case SETBODY:
      backupToLS('body', action.payload);
      return Object.assign({}, state, { body: action.payload });
    case DASHBOARDPOSTERROR:
      return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
    case SETHEADERIMAGE:
        backupToLS('headerImage', action.payload);
      return Object.assign({}, state, { headerImage: action.payload });
    case SETMETADESC:
        backupToLS('metaDescription', action.payload);
      return Object.assign({}, state, { metaDescription: action.payload });
    case SETMETAKEYWORDS:
        backupToLS('metaKeywords', action.payload);
      return Object.assign({}, state, { metaKeywords: action.payload });
    case RESTOREPOST:
      return Object.assign({}, state, { ...action.payload });
    case POSTSAVING:
      return Object.assign({}, state, { saving: action.payload });
    default:
      return state;
  }
};

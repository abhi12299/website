import { 
    DASHBOARDPOSTERROR,
    DASHBOARDPOSTLOADING, 
    SETTITLE, 
    SETBODY, 
    SETHEADERIMAGE,
    RESTOREPOST,
    SETMETADESC ,
    SETMETAKEYWORDS,
    POSTSAVING,
    FETCHPOSTLOADING,
    FETCHPOSTSUCCESS,
    FETCHPOSTERROR
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
  _id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARDPOSTLOADING:
      return Object.assign({}, state, { loading: true });
    case SETTITLE:
      if (action.keyName) {
        backupToLS('title', action.payload, action.keyName);
      } else {
        backupToLS('title', action.payload);
      }
      return Object.assign({}, state, { title: action.payload });
    case SETBODY:
      if (action.keyName) {
        backupToLS('body', action.payload, action.keyName);
      } else {
        backupToLS('body', action.payload);
      }
      return Object.assign({}, state, { body: action.payload });
    case DASHBOARDPOSTERROR:
      return Object.assign({}, state, { error: true, loading: false, errorMessage: action.payload });
    case SETHEADERIMAGE:
        if (action.keyName) {
          backupToLS('headerImage', action.payload, action.keyName);
        } else {
          backupToLS('headerImage', action.payload);
        }
      return Object.assign({}, state, { headerImage: action.payload });
    case SETMETADESC:
        if (action.keyName) {
          backupToLS('metaDescription', action.payload, action.keyName);
        } else {
          backupToLS('metaDescription', action.payload);
        }
      return Object.assign({}, state, { metaDescription: action.payload });
    case SETMETAKEYWORDS:
        if (action.keyName) {
          backupToLS('metaKeywords', action.payload, action.keyName);
        } else {
          backupToLS('metaKeywords', action.payload);
        }
      return Object.assign({}, state, { metaKeywords: action.payload });
    case RESTOREPOST:
      return Object.assign({}, state, { ...action.payload });
    case POSTSAVING:
      return Object.assign({}, state, { saving: action.payload });
    case FETCHPOSTLOADING:
      return Object.assign({}, state, { loading: action.payload });
    case FETCHPOSTSUCCESS:
      let { metaKeywords, headerImageURL } = action.payload;
      delete action.payload.headerImageURL;
      metaKeywords = (metaKeywords || []).join(',')
      return Object.assign({}, state, {
        loading: false, 
        ...action.payload, 
        metaKeywords, 
        headerImage: headerImageURL 
      });
    case FETCHPOSTERROR:
      return Object.assign({}, state, { loading: false, error: true, errorMessage: action.payload });
    default:
      return state;
  }
};

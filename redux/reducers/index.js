import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashboardPostReducer from './dashboardPostReducer';
import postsReducer from './postsReducer';
import dashboardMediaReducer from './dashboardMediaReducer';
import searchReducer from './searchReducer';
import singlePostReducer from './singlePostReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  dashboardPost: dashboardPostReducer,
  posts: postsReducer,
  dashboardMedia: dashboardMediaReducer,
  search: searchReducer,
  blogPost: singlePostReducer
});

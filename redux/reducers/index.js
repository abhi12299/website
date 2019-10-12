import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashboardPostReducer from './dashboardPostReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  dashboardPosts: dashboardPostReducer
});

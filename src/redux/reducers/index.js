import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import storyReducer from './storyReducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  stories: storyReducer,
});

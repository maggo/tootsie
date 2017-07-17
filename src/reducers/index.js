import { combineReducers } from 'redux';
import timeline from './timeline.js';
import authentication from './authentication.js';

export default combineReducers({
  timeline,
  authentication,
});

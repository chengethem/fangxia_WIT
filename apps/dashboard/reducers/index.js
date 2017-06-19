import { combineReducers } from 'redux';
import { CHOOSE_CONTENT_TYPE, REQUEST_CONTENT, RECEIVE_CONTENT, UPDATE_CONTENT, REQUESTED_CONTENT, RESET_REQUET_STATUS } from '../actions/actionTypes';

const contents = (state = {}, action) => {
  let default_obj = {};
  if (action && action.playload && action.playload.contents instanceof Array || state instanceof Array) {
    default_obj = [];
  }
  switch (action.type) {
    case REQUEST_CONTENT:
      return action.playload && Object.assign(default_obj, state || default_obj, action.playload.contents, { loading: true });
    case REQUESTED_CONTENT:
      return action.playload && Object.assign(default_obj, state || default_obj, { loading: false, fetched: false });
    case RECEIVE_CONTENT:
      return action.playload && action.playload.contents;
    case UPDATE_CONTENT:
      return action.playload && Object.assign(action.playload.contents, { loading: false, fetched: true });
    default:
      return state;
  }
};
const contentType = (state = '', action) => {
  switch (action.type) {
    case CHOOSE_CONTENT_TYPE:
    case REQUEST_CONTENT:
    case UPDATE_CONTENT:
    case RECEIVE_CONTENT:
      return action.playload && action.playload.contentType || '';
    default:
      return state;
  }
}

const contentsByType = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CONTENT:
    case REQUESTED_CONTENT:
    case UPDATE_CONTENT:
    case RECEIVE_CONTENT:
      // console.info('contentsByType', state, action, state[action.playload.contentType]);
      return Object.assign({}, state, {
        [action.playload.contentType]: contents(state[action.playload.contentType], action)
      })
    default:
      return state;
  }
};

export default combineReducers({ contentType, contentsByType });

import fetch from 'isomorphic-fetch';
import * as types from './ActionTypes';

const NETWORK_STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export const chooseContentType = (contentType) => ({
  type: types.CHOOSE_CONTENT_TYPE,
  playload: {
    contentType
  }
});
export const requestContent = (contentType) => ({
  type: types.REQUEST_CONTENT,
  playload: {
    contentType
  }
});
export const requestedContent = (contentType) => ({
  type: types.REQUESTED_CONTENT,
  playload: {
    contentType
  }
});
export const receiveContent = (contentType, json) => ({
  type: types.RECEIVE_CONTENT,
  playload: json
});
export const updateContent = (contentType, json) => ({
  type: types.UPDATE_CONTENT,
  playload: json
});
export const saveContent = (contentType, item, id, remove, add) => dispatch => {
  dispatch(requestContent(contentType));
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  return fetch(`/dashboard/api/${contentType}`, {
    method: 'POST',
    headers,
    //encode chinese & '&'
    body: `json=${encodeURIComponent(JSON.stringify({ contentType, item, id, remove, add }))}`
  })
    .then(response => response.json())
    .then(json => {
      console.info('saveContent_resp:', json);
      setTimeout(() => { dispatch(requestedContent(contentType)) }, 1500);
      return dispatch(updateContent(contentType, json));
    })
    .catch(error => {
      console.info('ERROR', error);
      dispatch(updateContent({ error }));
    });
}
export const removeContent = (contentType, item, id, remove) => dispatch => {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  return fetch(`/dashboard/api/${contentType}`, {
    method: 'POST',
    headers,
    //encode chinese & '&'
    body: `json=${encodeURIComponent(JSON.stringify({ contentType, item, id, remove }))}`
  })
    .then(response => response.json())
    .then(json => {
      console.info('saveContent_resp:', json);
      setTimeout(() => { dispatch(requestedContent(contentType)) }, 1500);
      return dispatch(updateContent(contentType, json));
    })
    .catch(error => {
      console.info('ERROR', error);
      dispatch(updateContent({ error }));
    });
};
export const fetchContent = (contentType) => dispatch => {
  dispatch(requestContent(contentType));
  return fetch(`/dashboard/api/${contentType}`)
    .then(response => response.json())
    .then(json => {
      console.info('fetchContent_resp:', json);
      return dispatch(receiveContent(contentType, json));
    })
    .catch(error => {
      console.info('ERROR', error);
      dispatch(receiveContent({ error }))
    });
};
export const resetRequestStatus = () => ({
  type: types.RESET_REQUET_STATUS
});

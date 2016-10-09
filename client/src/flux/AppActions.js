import AppDispatcher from './AppDispatcher';
import { CHANGE_QUERY, REQUEST_DATA, RECEIVE_DATA } from './AppConstants';

export function changeQuery(query) {
  AppDispatcher.dispatch({
    type: CHANGE_QUERY,
    payload: {
      query,
    },
  });
};

export function requestData() {
  AppDispatcher.dispatch({
    type: REQUEST_DATA,
  });
  return receiveData();
}

export function receiveData() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', () => {
    const res = req.responseText;
    AppDispatcher.dispatch({
      type: RECEIVE_DATA,
      payload: {
        data: JSON.parse(res),
      },
    });
  });
  req.open('GET', '/api/club-data');
  req.send();
  return req;
};
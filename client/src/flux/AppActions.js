import AppDispatcher from './AppDispatcher';
import {
  CHANGE_QUERY,
  REQUEST_DATA,
  RECEIVE_DATA,
  ERROR_DATA,
} from './AppConstants';

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
  
  const req = new XMLHttpRequest();
  req.addEventListener('load', () => {
    if (req.status === 200) {
      const res = req.responseText;
      receiveData(res);
    } else {
      errorData();
    }
  });
  req.addEventListener('error', () => {
    errorData();
  });
  
  req.open('GET', '/api/club-data');
  req.send();
  
  return req;
}

export function receiveData(res) {
  AppDispatcher.dispatch({
    type: RECEIVE_DATA,
    payload: {
      data: JSON.parse(res),
    },
  });
};

export function errorData() {
  AppDispatcher.dispatch({
    type: ERROR_DATA,
  });
};
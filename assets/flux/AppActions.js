import AppDispatcher from './AppDispatcher';
import { CHANGE_QUERY, GET_DATA } from './AppConstants';

export function changeQuery(query) {
  AppDispatcher.dispatch({
    type: CHANGE_QUERY,
    payload: {
      query,
    },
  });
};

export async function getData() {
  const res = await fetch('/api/club-data');
  const json = await res.json();
  AppDispatcher.dispatch({
    type: GET_DATA,
    payload: {
      data: json,
    },
  });
};
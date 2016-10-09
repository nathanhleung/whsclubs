import { ReduceStore } from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import {
  CHANGE_QUERY,
  REQUEST_DATA,
  RECEIVE_DATA,
  ERROR_DATA,
} from './AppConstants';

class AppStore extends ReduceStore {
  getInitialState() {
    return {
      query: '',
      data: [],
      loading: false,
      error: false,
    };
  }
  
  reduce(state, action) {
    switch (action.type) {
      case CHANGE_QUERY: {
        return Object.assign({}, state, {
          query: action.payload.query,
        });
      }
      case REQUEST_DATA: {
        return Object.assign({}, state, {
          loading: true,
        });
      }
      case RECEIVE_DATA: {
        return Object.assign({}, state, {
          loading: false,
          data: action.payload.data,
        });
      }
      case ERROR_DATA: {
        return Object.assign({}, state, {
          loading: false,
          error: true,
        });
      }
      default: {
        return state;
      }
    }
  }
};

const store = new AppStore(AppDispatcher);

export default store;
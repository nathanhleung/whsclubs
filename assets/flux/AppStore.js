import { ReduceStore } from 'flux/utils';
import AppDispatcher from './AppDispatcher';
import { CHANGE_QUERY, GET_DATA } from './AppConstants';

class AppStore extends ReduceStore {
  getInitialState() {
    return {
      query: '',
      data: [],
    };
  }
  
  reduce(state, action) {
    switch (action.type) {
      case CHANGE_QUERY: {
        return Object.assign({}, state, {
          query: action.payload.query,
        });
      }
      case GET_DATA: {
        return Object.assign({}, state, {
          data: action.payload.data,
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
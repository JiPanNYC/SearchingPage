import { 
  LOAD_USERPOST_REQUEST, LOAD_USERPOST_SUCCESS, LOAD_USERPOST_FAILURE, LOAD_USERSEARCH_REQUEST, LOAD_USERSEARCH_SUCCESS, LOAD_USERSEARCH_FAILURE 
} from './constants';

const initialState = {
  isFetching: false,
  loaded: false,
  searchingresult: [],
};

export default function searchresultlist(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USERPOST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        loaded: false,
      });
    case LOAD_USERPOST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        searchingresult: action.result
      });
    case LOAD_USERPOST_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
      case LOAD_USERSEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        loaded: false,
      });
    case LOAD_USERSEARCH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        loaded: true,
        searchingresult: action.result
      });
    case LOAD_USERSEARCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.searchingresult && globalState.searchingresult.loaded;
}

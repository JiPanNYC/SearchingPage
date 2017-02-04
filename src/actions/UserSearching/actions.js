import { LOAD_USERPOST_REQUEST, LOAD_USERPOST_SUCCESS, LOAD_USERPOST_FAILURE, LOAD_USERSEARCH_REQUEST, LOAD_USERSEARCH_SUCCESS, LOAD_USERSEARCH_FAILURE } from '../../redux/modules/constants';

export function fetchSearchPost() {
  return {
    types: [LOAD_USERPOST_REQUEST, LOAD_USERPOST_SUCCESS, LOAD_USERPOST_FAILURE],
    promise: (client) => client.get(`/api/v1/usersearching/`)
  };
}

export function fetchSearchQuery(query1,query2,query3,query4) {
  const usersearchQuery = "/api/v1/usersearch/?query1="+query1+"&query2="+query2+"&query3="+query3+"&query4="+query4; // need to split string and seperate them by commas
  return {
    types: [LOAD_USERSEARCH_REQUEST, LOAD_USERSEARCH_SUCCESS, LOAD_USERSEARCH_FAILURE],
    promise: (client) => client.get(`${usersearchQuery}`)
  };
}

import { REQUEST_TOOTS, RECEIVE_TOOTS } from '../actions';

function timeline(state = {
  isFetching: false,
  toots: []
}, action) {
  switch (action.type) {
    case REQUEST_TOOTS:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_TOOTS:
      return {
        ...state,
        isFetching: false,
        toots: action.toots,
        lastUpdated: action.receivedAt
      }
    default:
      return state;
  }
}

export default timeline;

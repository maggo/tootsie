import { REQUEST_CLIENT_DETAILS, RECEIVE_CLIENT_DETAILS } from '../actions/authentication';

function authentication(state = {
  instances: {}
}, action) {
  switch (action.type) {
    case REQUEST_CLIENT_DETAILS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_CLIENT_DETAILS:
      const instances = state.instances;
      instances[action.details.domain] = action.details;
      return {
        ...state,
        instances,
        isFetching: false
      }
    default:
      return state;
  }
}

export default authentication;

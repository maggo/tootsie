export const REQUEST_TOOTS = 'REQUEST_TOOTS';
export const RECEIVE_TOOTS = 'RECEIVE_TOOTS';

function requestToots() {
  return {
    type: REQUEST_TOOTS
  }
}

function receiveToots(toots) {
  return {
    type: RECEIVE_TOOTS,
    toots,
    receivedAt: Date.now()
  }
}

export function fetchToots () {
  return dispatch => {
    dispatch(requestToots());

    let requestHeaders = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    const instance = localStorage.getItem('instance');

    return fetch(`https://${instance}/api/v1/timelines/home`, {
      headers: requestHeaders
    })
      .then((res) => res.json())
      .then((toots) => dispatch(receiveToots(toots)));
  }
}

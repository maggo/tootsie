import { CONFIG_CLIENT_NAME, CONFIG_CLIENT_REDIRECT_URL, CONFIG_CLIENT_SCOPES } from '../config.js';

export const REQUEST_CLIENT_DETAILS = 'REQUEST_CLIENT_DETAILS';
export const RECEIVE_CLIENT_DETAILS = 'RECEIVE_CLIENT_DETAILS';

function requestClientDetails() {
  return {
    type: REQUEST_CLIENT_DETAILS
  }
}

function receiveClientDetails(details) {
  return {
    type: RECEIVE_CLIENT_DETAILS,
    details,
    receivedAt: Date.now()
  }
}

export function registerApplication(domain) {
  return (dispatch, getState) => {
    dispatch(requestClientDetails());

    const state = getState();

    if (state.authentication.instances[domain]) {
      return dispatch(receiveClientDetails(state.authentication.instances[domain]));
    } else {
      const data = new FormData();
      data.append('client_name', CONFIG_CLIENT_NAME);
      data.append('redirect_uris', CONFIG_CLIENT_REDIRECT_URL);
      data.append('scopes', CONFIG_CLIENT_SCOPES);

      return fetch(`https://${domain}/api/v1/apps`, {
        method: 'POST',
        body: data,
      })
      .then(res => res.json())
      .then(json => {
        dispatch(receiveClientDetails({
          domain,
          client_id: json.client_id,
          client_secret: json.client_secret
        }));
      })
      .catch((err) => { console.error(err) });
    }
  }
}

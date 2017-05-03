import React, { Component } from 'react';
import { APP_URL } from '../config.js';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  constructor() {
    super();

    const instance = localStorage.getItem('instance');
    const clientId = localStorage.getItem('client_id');

    this.state = {
      instance,
      authLink: `https://${instance}/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${APP_URL}&scope=read%20write%20follow`
    }
  }

  handleAuthCodePaste = (event) => {
    const token = event.clipboardData.getData('Text');
    const clientId = localStorage.getItem('client_id');
    const clientSecret = localStorage.getItem('client_secret');

    let formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('redirect_uri', APP_URL);
    formData.append('code', token);
    fetch(`https://${this.state.instance}/oauth/token`, {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.error) {
          console.log('Error!', json.error_description);
        } else {
          localStorage.setItem('access_token', json.access_token);
          this.props.history.push('/timeline');
        }
      });
  }

  render() {
    if (localStorage.getItem('access_token')) {
      return <Redirect to={{pathname: '/timeline'}} />;
    }

    return <div>
      <h1>Authenticate</h1>
      <p>
        Please click the button and authenticate with {this.state.instance} on the next page. 
        Copy the code provided and paste it here.
      </p>
      <a target="_blank" href={this.state.authLink}>Authenticate with {this.state.instance}</a>
      <label htmlFor="authCode">Auth-Code</label>
      <input id="authCode" type="text" onPaste={this.handleAuthCodePaste} />
    </div>;
  }
}

export default Auth;

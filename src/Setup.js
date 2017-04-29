import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Setup extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const [ user, instance ] = this.state.userHandle.split('@');
    console.log('Submit!', user, instance);

    localStorage.setItem('user', user);
    localStorage.setItem('instance', instance);

    let formData = new FormData();
    formData.append('client_name', 'Tootsie');
    formData.append('redirect_uris', 'urn:ietf:wg:oauth:2.0:oob');
    formData.append('scopes', 'read write follow');

    fetch(`http://${instance}/api/v1/apps`, {
      method: 'POST',
      body: formData
    }).then((res) => res.json())
    .then((json) => {
      localStorage.setItem('client_id', json.client_id);
      localStorage.setItem('client_secret', json.client_secret);
      this.props.history.push('/auth');
    });
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    if (localStorage.getItem('client_id') && localStorage.getItem('client_secret')) {
      return <Redirect to={{pathname: '/auth'}} />;
    }

    return <div>
      <h1>Setup</h1>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="userHandle">User Handle</label>
        <input 
          name="userHandle" 
          id="userHandle" 
          type="email" 
          required 
          placeholder="user@instance.tld"
          onChange={this.handleInputChange} 
        />
        <button>Sign in</button>
      </form>
    </div>;
  }
}

export default Setup;
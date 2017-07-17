import React, { Component } from 'react';
import New from './account/New';
import { Route } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { CONFIG_CLIENT_REDIRECT_URL, CONFIG_CLIENT_SCOPES } from '../../config.js';

class Accounts extends Component {
  handleAddUser = (instance) => {
    window.open(`https://${instance.domain}/oauth/authorize?response_type=code&client_id=${instance.client_id}&redirect_uri=${CONFIG_CLIENT_REDIRECT_URL}&scope=${encodeURIComponent(CONFIG_CLIENT_SCOPES)}`, '_blank')
  }

  render() {
    const { match, instances, history } = this.props;

    return (
      <div>
        <h2>Accounts</h2>

        <List>
          { Object.keys(instances).map(domain => <ListItem key={domain} nestedItems={[
            <ListItem key="addUser" leftIcon={<ContentAdd />} onClick={() => this.handleAddUser(instances[domain])}>
              Add user
            </ListItem>
          ]}>
            {domain}
          </ListItem>)}
          <ListItem onClick={() => history.push('new')}>New instance</ListItem>
        </List>

        <Route path={`${match.url}/new`} component={New} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    instances: state.authentication.instances,

  }
}

export default connect(mapStateToProps)(Accounts);

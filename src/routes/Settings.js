import React from 'react';
import { Route, Link } from 'react-router-dom';
import Accounts from './settings/Accounts.js';

const Settings = ({ children, match }) => (
  <div> 
    <h1>Settings</h1>

    <ul>
      <li><Link to={`${match.url}/accounts`}>Manage accounts</Link></li>
    </ul>

    <Route path={`${match.url}/accounts`} component={Accounts} />
  </div>
);

export default Settings;

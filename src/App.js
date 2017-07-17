import React from 'react';
import Setup from './routes/Setup.js';
import Timeline from './routes/Timeline.js';
import Settings from './routes/Settings.js';
import Auth from './routes/Auth.js';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = ({ isFetching }) => (
  <MuiThemeProvider>
    <div>
      <AppBar title="Tootsie" />
      {isFetching && <div>Fetching toots!</div>}
      <Router>
        <div>
          <Route path="/setup" component={Setup} />
          <Route path="/auth" component={Auth} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/settings" component={Settings} />
        </div>
      </Router>
    </div>
  </MuiThemeProvider>
);

const mapStateToProps = state => ({
  isFetching: state.timeline.isFetching
});

export default connect(mapStateToProps)(App);

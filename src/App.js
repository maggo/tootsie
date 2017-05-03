import React from 'react';
import Setup from './routes/Setup.js';
import Timeline from './routes/Timeline.js';
import Auth from './routes/Auth.js';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = ({ isFetching }) => (
  <div>
    {isFetching && <div>Fetching toots!</div>}
    <Router>
      <div>
        <Route path="/setup" component={Setup} />
        <Route path="/auth" component={Auth} />
        <Route path="/timeline" component={Timeline} />
      </div>
    </Router>
  </div>
);

const mapStateToProps = state => ({
  isFetching: state.timeline.isFetching
});

export default connect(mapStateToProps)(App);

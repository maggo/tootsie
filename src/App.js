import React, { Component } from 'react';
import Setup from './Setup.js';
import Timeline from './Timeline.js';
import Auth from './routes/Auth.js';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/setup" component={Setup} />
          <Route path="/auth" component={Auth} />
          <Route path="/timeline" component={Timeline} />
        </div>
      </Router>
    );
  }
}

export default App;

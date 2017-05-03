import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toot from '../components/Toot.js';
import { fetchToots } from '../actions.js';
import { connect } from 'react-redux';
import './Timeline.css';

class Timeline extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchToots());
  }

  render() {
    const { toots } = this.props;
    return (
      <ul className="timeline">
        {toots.map(toot => <li key={toot.id}>
          <Toot
            account={toot.account}
            content={toot.content}
            favoritesCount={toot.favourites_count}
            reblogCount={toot.reblogs_count}
          />
        </li>)}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  const { isFetching, toots } = state.timeline;

  return {
    isFetching,
    toots,
  };
}

Timeline.propTypes = {
  toots: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Timeline);

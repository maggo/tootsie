import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toot from '../components/Toot.js';
import { fetchToots } from '../actions';
import { connect } from 'react-redux';
import './Timeline.css';

class Timeline extends Component {
  handleRefreshClick = (e) => {
    e.preventDefault();
    this.props.onRefresh();
  }

  render() {
    const { toots } = this.props;
    return (
      <div>
        <a href="#" onClick={this.handleRefreshClick}>Refresh</a>
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
      </div>
    );
  }
}

Timeline.propTypes = {
  toots: PropTypes.array.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { isFetching, toots } = state.timeline;

  return {
    isFetching,
    toots,
  };
}

const mapDispatchToProps = dispatch => ({
  onRefresh: () => dispatch(fetchToots())
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);

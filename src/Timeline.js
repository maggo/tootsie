import React, { Component } from 'react';
import Toot from './Toot.js';
import './Timeline.css';

class Timeline extends Component {
  constructor() {
    super();

    this.state = {
      statuses: []
    };

    let requestHeaders = new Headers({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    const instance = localStorage.getItem('instance');

    fetch(`https://${instance}/api/v1/timelines/home`, {
      headers: requestHeaders
    })
      .then((res) => res.json())
      .then((statuses) => {
        console.log(statuses);
        this.setState({
          statuses: statuses.map((status) => {
            return {
              account: {
                displayName: status.account.display_name,
                handle: status.account.acct,
                avatar: status.account.avatar,
                url: status.account.url,
              },
              id: status.id,
              content: status.content,
              favoritesCount: status.favourites_count,
              reblogCount: status.reblogs_count,
            };
          })
        });
      });
  }

  render() {
    return (
      <ul className="timeline">
        {this.state.statuses.map((status) => <li key={status.id}>
          <Toot
            account={status.account}
            content={status.content}
            favoritesCount={status.favoritesCount}
            reblogCount={status.reblogCount}
          />
        </li>)}
      </ul>
    );
  }
}

export default Timeline;
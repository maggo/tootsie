import React from 'react';
import PropTypes from 'prop-types';
import './Toot.css';
import './Avatar.css';

const Toot = (props) => {
  return <div className="toot">
    <a className="toot__avatar" href={props.account.url}>
      <img className="avatar" src={props.account.avatar} alt={props.account.handle} />
    </a>
    <div className="toot__content">
      <div className="toot__user"><a href={props.account.url}>{props.account.display_name}</a></div>
      <div className="toot__message" dangerouslySetInnerHTML={{__html: props.content}}></div>
      <div className="toot__meta">
        {props.favoritesCount} Favs |
        {props.reblogCount} Retoots
      </div>
    </div>
  </div>
};

Toot.propTypes = {
  account: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  reblogCount: PropTypes.number.isRequired,
}

export default Toot;

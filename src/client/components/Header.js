import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
        <div>Fuzzy Critter Poker Tournament</div>
        <div>
          <Link to="/">
            <button type="button" className="btn btn-small btn-secondary" alt="Delete player">
              Leaderboard <i className="fas fa-trophy" />
            </button>
          </Link>
        </div>
      </header>
    );
  }
}

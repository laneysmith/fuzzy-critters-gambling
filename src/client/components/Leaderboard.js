import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { renderFlag, moneyFormatter } from '../helpers/countryCodes';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = { players: null };
  }

  componentDidMount() {
    fetch('/api/players')
      .then(res => res.json())
      .then((response) => {
        this.setState({ players: response });
      });
  }

  static renderTableRows(playerData) {
    if (playerData) {
      return playerData.map((player, index) => {
        const {
          id, name, nationality, winnings, imgSrc
        } = player;
        return (
          <div className="chartRow" key={player.id}>
            <div className="cell">#{index + 1}</div>
            <div className="cell">
              {renderFlag(nationality)} {nationality}
            </div>
            <div className="description">
              <img src={imgSrc} className="playerThumbnail" alt={name} />
              <Link to={`/player/${id}`}>{name}</Link>
            </div>
            <div className="cell">{moneyFormatter(winnings)}</div>
          </div>
        );
      });
    }
    return null;
  }

  render() {
    const { players } = this.state;
    if (players) {
      return (
        <section id="leaderboard">
          <SectionHeading title="Leaderboard">
            <Link to="/add">
              <button type="button" className="btn btn-small btn-primary" alt="Add user">
                Add Player <i className="fas fa-user-plus" />
              </button>
            </Link>
          </SectionHeading>
          <div className="table">
            <div className="chartRow">
              <div className="cell">Rank</div>
              <div className="cell">Nationality</div>
              <div className="description">Player</div>
              <div className="cell">Winnings</div>
            </div>
            {Leaderboard.renderTableRows(players)}
          </div>
        </section>
      );
    }
    return 'Loading players...';
  }
}

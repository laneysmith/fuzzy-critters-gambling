import React, { Component } from 'react';
import SectionHeading from './SectionHeading';
import { renderFlag, moneyFormatter } from '../helpers/countryCodes';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
      // changesMade: false
    };
  }

  componentDidMount() {
    fetch(`/api/player/${this.props.match.params.id}`)
      .then(res => res.json())
      .then((response) => {
        this.setState(() => response.data);
      });
  }

  toggleIsEditing() {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  }

  deletePlayer(id, name) {
    const msg = `Are you sure you want to delete ${name}?`;
    alert(msg);
  }

  renderModifySaveButton(isEditing) {
    const color = isEditing ? 'success' : 'primary';
    const text = isEditing ? 'Save' : 'Modify';
    const icon = isEditing ? 'save' : 'user-edit';
    return (
      <button
        type="button"
        className={`btn btn-small btn-${color} fixed`}
        onClick={() => this.toggleIsEditing()}
        alt="Modify player"
      >
        {text}
        <i className={`fas fa-${icon}`} />
      </button>
    );
  }

  render() {
    if (this.state.id) {
      const {
        name, winnings, nationality, id, imgSrc, isEditing
      } = this.state;
      return (
        <section id="profile">
          <SectionHeading title={name}>
            <button
              type="button"
              className="btn btn-small btn-danger fixed"
              onClick={() => this.deletePlayer(id, name)}
              alt="Delete player"
            >
              Delete <i className="fas fa-trash-alt" />
            </button>
            {this.renderModifySaveButton(isEditing)}
          </SectionHeading>
          <div className="content">
            <img src={imgSrc} className="playerProfile" alt={name} />
            <div className="profileDetails">
              <div className="label">Player Id</div>
              <div className="detail">{id}</div>
              <div className="label">Nationality</div>
              <div className="detail">
                {renderFlag(nationality)} {nationality}
              </div>
              <div className="label">Winnings</div>
              <div className="detail">
                {isEditing ? (
                  <input defaultValue={winnings} type="number" />
                ) : (
                  moneyFormatter(winnings)
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }
    return 'Loading player...';
  }
}

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { renderFlag, moneyFormatter } from '../helpers/countryCodes';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.handleUpdatePlayer = this.handleUpdatePlayer.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    fetch(`/api/player/${this.props.match.params.id}`)
      .then(res => res.json())
      .then((response) => {
        this.setState(() => response);
      });
  }

  toggleIsEditing() {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  }

  handleUpdatePlayer() {
    const { id } = this.props.match.params;
    fetch(`/api/player/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        winnings: this.state.winnings
      })
    }).then(() => this.toggleIsEditing());
  }

  handleDeletePlayer(id) {
    fetch(`/api/player/${id}`, {
      method: 'DELETE'
    }).then(() => this.props.history.push('/'));
  }

  renderModifySaveButton(isEditing) {
    const color = isEditing ? 'success' : 'primary';
    const text = isEditing ? 'Save' : 'Modify';
    const icon = isEditing ? 'save' : 'user-edit';
    const action = isEditing ? this.handleUpdatePlayer : this.toggleIsEditing;
    return (
      <button
        type="button"
        className={`btn btn-small btn-${color} fixed`}
        onClick={() => action()}
        alt={`${text} player`}
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
              onClick={() => this.handleDeletePlayer(id)}
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
                  <input
                    id="winnings"
                    name="winnings"
                    defaultValue={winnings}
                    type="number"
                    onChange={e => this.handleChange(e)}
                  />
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

export default withRouter(Profile);

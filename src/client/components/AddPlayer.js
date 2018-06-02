import React, { Component } from 'react';
import SectionHeading from './SectionHeading';
import { countryCodes } from '../helpers/countryCodes';

export default class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
      // changesMade: false
    };
  }

  componentDidMount() {
    // fetch(`/api/player/${this.props.match.params.id}`)
    //   .then(res => res.json())
    //   .then((response) => {
    //     this.setState(() => response.data);
    //   });
  }

  toggleIsEditing() {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  }

  handleAddPlayer(event) {
    event.preventDefault();
    console.log('event.target', event.target);
    // console.log('new player name = ', event.target.name.value);
  }

  renderNationalityOptions() {
    return Object.keys(countryCodes).map(country => (
      <option key={country} value={country}>
        {country}
      </option>
    ));
  }

  render() {
    return (
      <section id="add">
        <SectionHeading title="Add Player" />
        <form onSubmit={event => this.handleAddPlayer(event)}>
          <label htmlFor="name">
            Name
            <input type="text" id="name" name="name" placeholder="Dog Boy" autoComplete="off" />
          </label>
          <label htmlFor="winnings">
            Winnings
            <input
              type="number"
              id="winnings"
              name="winnings "
              placeholder="1234567"
              autoComplete="off"
            />
          </label>
          <label htmlFor="nationality">
            Nationality
            <select id="nationality" name="nationality" defaultValue="default">
              <option value="default" disabled />
              {this.renderNationalityOptions()}
            </select>
          </label>
          <button
            type="submit"
            className="btn btn-small btn-primary"
            onClick={_ => _}
            alt="Save new player"
          >
            Save <i className="fas fa-save" />
          </button>
        </form>
      </section>
    );
  }
}

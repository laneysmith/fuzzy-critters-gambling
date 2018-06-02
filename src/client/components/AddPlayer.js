import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SectionHeading from './SectionHeading';

class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: null,
      name: '',
      winnings: '',
      nationality: '',
      imgSrc: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    fetch('/api/country')
      .then(res => res.json())
      .then((response) => {
        this.setState({ countries: response });
      });
  }

  handleAddPlayer(event) {
    event.preventDefault();
    const {
      name, winnings, nationality, imgSrc
    } = this.state;
    const newPlayer = {
      name,
      winnings,
      nationality,
      imgSrc
    };
    fetch('/api/player', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlayer)
    }).then(() => this.props.history.push('/'));
  }

  renderNationalityOptions() {
    const { countries } = this.state;
    if (countries) {
      return countries.map(country => (
        <option key={country.id} value={country.id}>
          {country.alpha3}
        </option>
      ));
    }
    return null;
  }

  disableSubmit() {
    const {
      name, winnings, nationality, imgSrc
    } = this.state;
    return !name || !winnings || !nationality || !imgSrc;
  }

  render() {
    return (
      <section id="add">
        <SectionHeading title="Add Player" />
        <form>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Cheshire Cat"
              autoComplete="off"
              value={this.state.name}
              onChange={e => this.handleChange(e)}
            />
          </label>
          <label htmlFor="winnings">
            Winnings
            <input
              type="text"
              id="winnings"
              name="winnings"
              placeholder="1234567"
              max="2147483647"
              required="required"
              pattern="(2000000000|([1]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?[0-9]?))"
              autoComplete="off"
              onChange={e => this.handleChange(e)}
            />
          </label>
          <label htmlFor="nationality">
            Nationality
            <select
              id="nationality"
              name="nationality"
              defaultValue="default"
              onChange={e => this.handleChange(e)}
            >
              <option value="default" disabled />
              {this.renderNationalityOptions()}
            </select>
          </label>
          <label htmlFor="imgSrc">
            Image Url
            <input
              type="text"
              id="imgSrc"
              name="imgSrc"
              placeholder="http://google.com/cat.jpg"
              onChange={e => this.handleChange(e)}
            />
          </label>
          <button
            type="submit"
            className="btn btn-small btn-primary"
            onClick={event => this.handleAddPlayer(event)}
            alt="Save new player"
            disabled={this.disableSubmit()}
          >
            Save <i className="fas fa-save" />
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(AddPlayer);

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './styles/main.css';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import AddPlayer from './components/AddPlayer';

export default class App extends Component {
  render() {
    return (
      <div id="appContainer">
        <Header />
        <main>
          <Route exact path="/" component={Leaderboard} />
          <Route path="/player/:id" component={Profile} />
          <Route path="/add" component={AddPlayer} />
        </main>
        <footer>&copy; 2018 International Fuzzy Critter Gambling Consortium</footer>
      </div>
    );
  }
}

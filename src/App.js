import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// const APIurl = "http://localhost:8888/"
const APIurl = "https://crowdbeats-host.herokuapp.com/"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_status: false,
      party_id: "",
      playlist_id: ""
    }
  }


  displayAuthStatus() {
    if (this.state.auth_status == true) {
      return "You're logged in!";
    }
    if (this.state.auth_status == false) {
      return "Please Log in Below";
    }
  }
  checkAuthStatus() {
    fetch(APIurl + 'authstatus').then(function (response) {
      return response.json();
    })
      .then(
        (response) => {
          this.setState({ auth_status: response.auth_status });
        }
      )
  }

  //only call when auth_status is true
  setPlaylist() {
    fetch(APIurl + 'setplaylist?id=' + this.state.playlist_id).then(function (response) {
      return response.json();
    }).then(
      (response) => { } // empty function for now
    )
  }

  updatePlaylistId(event) {
    this.setState({ playlist_id: event.target.value })
  }

  //only call when auth_status is true and playlist is set
  fetchPartyId() {
    fetch(APIurl + 'party_id').then(function (response) {
      return response.json();
    })
      .then(
        (response) => {
          this.setState({ party_id: response.party_id });
        }
      )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>First, Login to Spotify. Then, copy Spotify ID of your playlist (from the Spotify App/Website) and submit it. Then get the party code!</h3>
          <button class="ripple" onClick={() => { this.checkAuthStatus() }}>Update Auth Status (after logging in)</button>
          <h2>{this.displayAuthStatus()}</h2>
          <a class="link" href={APIurl + 'login'} > Login to Spotify </a>
          <br></br>
          <br></br>
          <input placeholder="Set Playlist ID" value={this.state.playlist_id} onChange={(event) => this.updatePlaylistId(event)} />
          <br></br>
          <button class="ripple" onClick={() => { this.setPlaylist() }}>Submit</button>
          <br></br>
          <button class="ripple" onClick={() => { this.fetchPartyId() }}>Get Party Code</button>
          <h1>{this.state.party_id}</h1>
          <a class="link" href={APIurl + 'logout'}> Log Out </a>
        </header>
      </div>
    );
  }
}
export default App;

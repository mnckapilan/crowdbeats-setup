import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// const APIurl = "http://localhost:8888/"
const APIurl = "http://crowdbeats-host.herokuapp.com/"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      party_id :"",
    }
  }

  updatePartyCode(event){
    this.setState({partyCode:event.target.value})
  }

  fetchPartyId(){
    fetch(APIurl+'party_id').then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(
      (response) => {
        this.setState({party_id:response.party_id});
      }
    )
  }
  
  render() {
    return (
      <div className="App">
      <header className="App-header">        
        <a class="link" href={APIurl+'login'} > Login to Spotify </a>
        <br></br>
        <button class="ripple" onClick={() => {this.fetchPartyId()}}>Get Party Code</button>
        <h1>{this.state.party_id}</h1>
        <a class="link" href={APIurl+'logout'}> Log Out </a>
      </header>
    </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
import ConcertList from '../ConcertList/ConcertList.js'
import Songkick from '../../util/Songkick.js'

Spotify.getAccessToken();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
      concerts: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.collectArtists = this.collectArtists.bind(this);
    this.searchConcerts = this.searchConcerts.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.setState({playlistTracks: this.state.playlistTracks.concat(track)});
    this.setState({searchResults: this.state.searchResults.filter(tracks => tracks.id !== track.id)});
    console.log(this.state.playlistTracks);
  }

  removeTrack(track) {
    console.log(this.state.playlistTracks);
    this.setState({playlistTracks: this.state.playlistTracks.filter(tracks => tracks.id !== track.id)});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: "New Playlist"});
    this.setState({playlistTracks: []});
    this.setState({searchResults: []});
  }

  search(term) {
    Spotify.search(term).then(
      searchResults => this.setState({
        searchResults: searchResults
      }));
  }

  collectArtists(){
    let artists = this.state.playlistTracks.map(track => track.artist)
    let uniqueArtists = new Set(artists)
    uniqueArtists = Array.from(uniqueArtists);
    console.log(uniqueArtists);
    return uniqueArtists;
  }

  searchConcerts(){
    Songkick.searchConcerts(this.collectArtists())
    .then(concerts => this.setState(
      {
        concerts: concerts
      }
    ));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} onLogin={this.login}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onFind={this.collectArtists}/>
          </div>
          <div className="App-concert">
            <ConcertList concerts={this.state.concerts}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
//<SearchResults />
//<Playlist />

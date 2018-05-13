import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist" >
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <div className="Playlist-buttons">
          <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
          <a className="Playlist-save" onClick={this.props.onFind}>FIND CONCERTS</a>
        </div>
      </div>
    );
  }
}

export default Playlist;

/*
<div className="Playlist-buttons">
  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
  <a className="Playlist-save">FIND CONCERTS</a>
</div>
*/

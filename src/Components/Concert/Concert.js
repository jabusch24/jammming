import React, { Component } from 'react';
import './Concert.css';

class Concert extends Component {
  render() {
    return (
      <div className="Concert">
        <div className="Concert-information">
          <h3>{this.props.concert.concertName}</h3>
          <p>{this.props.concert.artist} | {this.props.concert.city}</p>
        </div>
        <a className="Concert-action">Book now!</a>
      </div>
    );
  }
}

export default Concert;

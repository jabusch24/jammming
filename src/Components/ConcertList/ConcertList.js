import React, { Component } from 'react';
import Concert from '../Concert/Concert.js';
import './ConcertList.css';

class ConcertList extends Component {
  render(){
    return (
      <div className="ConcertList" >
        <h2>Upcoming Concerts</h2>
        {
          this.props.concerts.map(concert => {
            return <Concert concert={concert}/>
          })
        }
      </div>
    );
  }
}

export default ConcertList;

import React, { Component, PropTypes } from 'react';
import ClubBox from '../ClubBox/';

class ClubsList extends Component {
  render() {
    const clubs = this.props.clubs;
    console.log(clubs);
    function createBoxes() {
      return clubs.map((club, index) => {
        return (
          <ClubBox key={club.id} data={club} width={25} clearfix={index % 4 === 0} />
        );
      })
    }
    return (
      <div>{createBoxes()}</div>
    );
  }
}

ClubsList.propTypes = {
  clubs: PropTypes.array,
}

export default ClubsList;
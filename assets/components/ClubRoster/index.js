import React, { Component, PropTypes } from 'react';

class ClubRoster extends Component {
  render() {
    const club = this.props.club;
    function getProgress(member, club) {
      const credit = Number(member.credit);
      if (!isNaN(credit)) {
        return Math.round(credit / club.required * 100);
      } else {
        return 'N/A';
      }
    }
    function createRows() {
      return club.roster.map((member, index) => {
        return (
          // This'll give an error but it usually is the fault of
          // the spreadsheet owner
          <tr key={member.name}>
            <td>{index + 1}</td>
            <td>{member.name}</td>
            <td>{member.credit}</td>
            <td>{getProgress(member, club)}%</td>
          </tr>
        );
      });
    }
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {createRows()}
        </tbody>
      </table>
    );
  }
}

ClubRoster.propTypes = {
  club: PropTypes.object.isRequired,
};

export default ClubRoster;
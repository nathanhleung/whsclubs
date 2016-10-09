import React, { Component, PropTypes } from 'react';
import styles from './ClubRoster.css';

class ClubRoster extends Component {
  render() {
    const club = this.props.club;
    const filteredRoster = club.roster.filter((member) => {
      const regexQuery = new RegExp(this.props.query, 'i')
      if (regexQuery.test(member.name)) {
        return true;
      }
      return false;
    });
    function getProgress(member, club) {
      const credit = Number(member.credit);
      if (!isNaN(credit)) {
        // get percent out of 100
        const percent = Math.round(credit / club.required * 100 * 100) / 100;
        return `${percent}%`;
      } else {
        return 'N/A';
      }
    }
    function createRows() {
      return filteredRoster.map((member, index) => {
        return (
          // This'll give an error but it usually is the fault of
          // the spreadsheet owner for having duplicate name entries
          <tr key={member.name}>
            <td>{index + 1}</td>
            <td>{member.name}</td>
            <td>{member.credit}</td>
            <td>{getProgress(member, club)}</td>
          </tr>
        );
      });
    }
    return (
      <table className={styles.clubRoster}>
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
  query: PropTypes.string.isRequired,
  club: PropTypes.object.isRequired,
};

export default ClubRoster;
import React, { Component, PropTypes } from 'react';
import Button from '../Button/';
import ClubRoster from '../ClubRoster/';
import styles from './ClubBox.css';

function getUrl(club) {
  return `https://docs.google.com/spreadsheets/d/${club.docid}/edit`;
}

class ClubBox extends Component {
  render() {
    const club = this.props.data;
    return (
      <div className={styles.clubBox} style={{ width: this.props.width + '%' }}>
        <h2 className={styles.clubBoxHeader}>
          {club.name}&nbsp;&nbsp;
          <Button target='_blank' href={getUrl(club)} size={10}>
            View Credit Sheet
          </Button>
        </h2>
        <h3 className={styles.clubBoxSubtitle}>{club.required} {club.creditsWord} required</h3>
        <ClubRoster club={club} query={this.props.query} />
      </div>
    );
  }
}

ClubBox.propTypes = {
  query: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
};

export default ClubBox;
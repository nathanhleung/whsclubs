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
    const width = `calc(${this.props.width}% - ${2 * this.props.margin}px)`;
    return (
      <div className={styles.clubBox} style={{
        width,
        margin: `${this.props.margin}px`
      }}>
        <h2 className={styles.clubBoxHeader}>
          {club.name}&nbsp;&nbsp;
          <Button target='_blank' href={getUrl(club)} size={10}>
            View Credit Sheet
          </Button>
        </h2>
        <h3 className={styles.clubBoxSubtitle}>{club.required} {club.creditsWord} required</h3>
        <p className={styles.clubBoxNotes}>
          {club.notes}
        </p>
        <ClubRoster club={club} query={this.props.query} />
      </div>
    );
  }
}

ClubBox.propTypes = {
  query: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
};

export default ClubBox;
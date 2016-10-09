import React, { Component, PropTypes } from 'react';
import Button from '../Button/';
import ClubRoster from '../ClubRoster/';
import styles from './ClubBox.css';

function getUrl(club) {
  return `https://docs.google.com/spreadsheets/d/${club.docid}/export?exportFormat=csv&gid=${club.gid}`;
}

class ClubBox extends Component {
  render() {
    const club = this.props.data;
    return (
      <div className={styles.clubBox} style={{ width: this.props.width + '%' }}>
        <h2>
          {club.name}&nbsp;
          <Button href={getUrl(club)} size={12}>
            Credit Sheet
          </Button>
        </h2>
        <h3>{club.required} {club.creditsWord} required</h3>
        <ClubRoster club={club}/>
      </div>
    );
  }
}

ClubBox.propTypes = {
  data: PropTypes.object,
  width: PropTypes.number.isRequired,
  clearfix: PropTypes.bool.isRequired,
};

export default ClubBox;
import React, { Component, PropTypes } from 'react';
import ClubBox from '../ClubBox/';
import Clearfix from '../Clearfix/';
import styles from './ClubsList.css';

class ClubsList extends Component {
  render() {
    if (this.props.error) {
      return (
        <div className={styles.messageContainer}>
          <h1>An Error Occurred</h1>
        </div>
      );
    }
    if (this.props.loading) {
      return (
        <div className={styles.messageContainer}>
          <h1>Loading...</h1>
        </div>
      );
    }
    const clubs = this.props.clubs;
    const createBoxes = () => {
      return clubs.map((club, index) => {
        return (
          <ClubBox
            key={club.id}
            data={club}
            query={this.props.query}
            width={100 / this.props.rowSize}
            margin={15}
          />
        );
      })
    };
    const addClearfix = () => {
      const boxes = createBoxes();
      const clearfixed = [];
      let counter = 0;
      for (let i = 0; i < boxes.length; i++) {
        if (i % this.props.rowSize === 0) {
          clearfixed.push(
            <Clearfix key={`clearfix-${counter}`} />
          );
          counter++;
        }
        clearfixed.push(boxes[i]);
      }
      // Add last clearfix to ensure ClubsList height is
      // the height of all the ClubBoxes (if this isn't
      // added, then the height of ClubsList will end where
      // the last clearfix is)
      clearfixed.push(
        <Clearfix key={`clearfix-${counter}`} />
      );
      return clearfixed;
    };
    return (
      <div>{addClearfix()}</div>
    );
  }
}

ClubsList.propTypes = {
  error: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  clubs: PropTypes.array.isRequired,
  rowSize: PropTypes.number.isRequired,
}

export default ClubsList;
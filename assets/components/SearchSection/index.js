import React, { Component, PropTypes } from 'react';
import SearchInput from '../SearchInput/';
import styles from './SearchSection.css';


class SearchSection extends Component {
  render() {
    let inline = {};
    if (this.props.center) {
      inline = {
        'text-align': 'center',
      };
    }
    return (
      <div>
        <h2 style={inline} className={styles.searchHeader}>Search by Name</h2>
        <p style={inline} className={styles.searchSubtitle}>Find your name on various WHS club credit sheets</p>
        &nbsp;
        <SearchInput center={true} query={this.props.query} />
      </div>
    );
  }
}

SearchSection.propTypes = {
  query: PropTypes.string,
  center: PropTypes.bool.isRequired,
};

export default SearchSection;
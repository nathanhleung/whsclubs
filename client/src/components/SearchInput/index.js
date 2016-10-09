import React, { Component, PropTypes } from 'react';
import { changeQuery } from '../../flux/AppActions';
import styles from './SearchInput.css';

class SearchSymbol extends Component {
  render() {
    const inline = {
      top: this.props.top,
      left: this.props.left,
      fontSize: this.props.size,
    };
    return (
      <span className={styles.searchSymbol} style={inline}>
        &#x2315;
      </span>
    );
  }
}

SearchSymbol.propTypes = {
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

class SearchInput extends Component {
  _onChange(e) {
    changeQuery(e.target.value);
  }
  render() {
    let divInline = {};
    let inputInline = {};
    if (this.props.center) {
      divInline = {
        textAlign: 'center',
      };
      inputInline = {
        textAlign: 'center',
        paddingLeft: '15px',
      };
    }
    return (
      <div style={divInline}>
        <SearchSymbol top='2px' size='2rem' left='20px'/>
        <input
          type='text'
          onChange={this._onChange}
          value={this.props.query}
          placeholder='Aubrey Graham'
          className={styles.searchInput}
          style={inputInline}
        />
      </div>
    );
  }
}

SearchInput.propTypes = {
  query: PropTypes.string.isRequired,
  center: PropTypes.bool.isRequired,
};

export default SearchInput;
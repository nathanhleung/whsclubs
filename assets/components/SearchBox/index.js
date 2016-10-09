import React, { Component, PropTypes } from 'react';
import { changeQuery } from '../../flux/AppActions';

class SearchBox extends Component {
  _onChange(e) {
    changeQuery(e.target.value);
  }
  render() {
    return (
      <div>
        <label>Search</label>
        &nbsp;
        <input
          type='text'
          onChange={this._onChange}
          value={this.props.query}
          placeholder='Aubrey Graham'
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  query: PropTypes.string,
};

export default SearchBox;
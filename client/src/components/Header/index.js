import React, { Component, PropTypes } from 'react';
import TimePercent from '../TimePercent/';
import styles from './Header.css';

const start = (new Date(2016, 8, 27)).getTime();
const end = (new Date(2017, 6, 15)).getTime();

class Header extends Component {
  render() {
    let inline = {};
    if (this.props.center) {
      inline = {
        textAlign: 'center',
      };
    }
    return (
      <div style={inline}>
        <h1 className={styles.header}>Credit Sheet Search 3.0</h1> 
        <TimePercent
          start={start}
          end={end}
          intervalName={'the year'}
        />
      </div>
    );
  }
}

Header.propTypes = {
  center: PropTypes.bool.isRequired,
};

export default Header;
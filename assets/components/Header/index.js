import React, { Component } from 'react';
import TimePercent from '../TimePercent/';
import styles from './Header.css';

const start = (new Date(2016, 8, 27)).getTime();
const end = (new Date(2017, 6, 15)).getTime();

class Header extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.header}>Credit Sheet Search</h1>
        <TimePercent start={start} end={end} />
      </div>
    );
  }
}

export default Header;
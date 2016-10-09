import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppStore from '../../flux/AppStore';
import { getData } from '../../flux/AppActions';

import Header from '../Header/';
import SearchBox from '../SearchBox/';
import ClubsList from '../ClubsList/';

import styles from './App.css';

class App extends Component {
  static getStores() {
    return [AppStore];
  }
  
  static calculateState() {
    const state = AppStore.getState();
    return {
      query: state.query,
      data: state.data,
    };
  }
  
  componentDidMount() {
    getData();
  }
  
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <SearchBox query={this.state.query} />
        <ClubsList clubs={this.state.data} />
      </div>
    );
  }
}

const AppContainer = Container.create(App);

export default AppContainer;
import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppStore from '../../flux/AppStore';
import { requestData } from '../../flux/AppActions';

import Header from '../Header/';
import SearchSection from '../SearchSection/';
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
      loading: state.loading,
      error: state.error,
    };
  }
  
  componentDidMount() {
    this.request = requestData();
  }
  
  componentWillUnmount() {
    this.request.abort();
  }
  
  render() {
    let rowSize = 3;
    // pseudo-responsive lol
    if (window.innerWidth < 992) {
      rowSize = 1;
    }
    return (
      <div className={styles.app}>
        <Header center={true}/>
        <br />
        <SearchSection center={true} query={this.state.query} />
        <br />
        <br />
        <ClubsList
          error={this.state.error}
          query={this.state.query}
          loading={this.state.loading}
          clubs={this.state.data}
          rowSize={rowSize} />
      </div>
    );
  }
}

const AppContainer = Container.create(App);

export default AppContainer;
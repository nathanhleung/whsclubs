import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppStore from '../../flux/AppStore';
import { requestData } from '../../flux/AppActions';

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
      loading: state.loading,
    };
  }
  
  componentDidMount() {
    this.request = requestData();
  }
  
  componentWillUnmount() {
    this.request.abort();
  }
  
  render() {
    return (
      <div className={styles.app}>
        <Header />
        <SearchBox query={this.state.query} />
        <ClubsList
          query={this.state.query}
          loading={this.state.loading}
          clubs={this.state.data}
          rowSize={3} />
      </div>
    );
  }
}

const AppContainer = Container.create(App);

export default AppContainer;
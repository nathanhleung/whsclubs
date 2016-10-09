import React, { Component, PropTypes } from 'react';
import styles from './TimePercent.css';

class TimePercent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: this.getPercent(),
    };
  }
  
  round(num, places) {
    const rounded = Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
    const result = rounded.toFixed(places);
    return result;
  }
  
  getPercent() {
    const now = (new Date()).getTime();
    const elapsed = now - this.props.start;
    const interval = this.props.end - this.props.start;
    const percent = elapsed / interval * 100;
    return percent;
  }
  
  tick() {
    this.setState({
      percent: this.getPercent(),
    });
  }
  
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div className={styles.timePercent}>We are about {this.round(this.state.percent, 6)}% through {this.props.intervalName}</div>
    );
  }
}

TimePercent.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  intervalName: PropTypes.string.isRequired,
};

export default TimePercent;
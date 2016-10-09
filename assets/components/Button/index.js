import React, { Component, PropTypes } from 'react';
import styles from './Button.css';

class Button extends Component {
  render() {
    let inline = {};
    if (this.props.size) {
      inline = {
        fontSize: (this.props.size * 1.2).toString() + 'px',
        padding: (this.props.size * 0.8).toString() + 'px',
      };
    }
    return (
      <a href={this.props.href} className={styles.button} style={inline}>
        {this.props.children}
      </a>
    );
  }
}

Button.propTypes = {
  href: PropTypes.string,
  size: PropTypes.number,
};

export default Button;
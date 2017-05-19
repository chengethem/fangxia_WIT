import React, { Component, PropTypes } from 'react';
import styles from './style.css';
class Layout extends Component {
  render() {
    const { clildren, left, right } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.left}>{left}</div>
        <div className={styles.right}>{right}</div>
      </div>
    );
  }
}
export default Layout;
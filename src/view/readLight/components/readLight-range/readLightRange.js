import React from 'react';
import styles from './readLightRange.css'

export default class ReadLightRange extends React.Component {
  
  render() {
    return (
      <div className={styles.inputRange} >
        <input type="range"  min="0" max="100"  style={{'background':'linear-gradient(to right, #ffb354, #ffb354 50%, white 51% ,white)'}}/>
      </div>
    );
  }
}

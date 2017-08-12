import React from 'react'

import styles from  './inputRange.css'

const InputRange = ({touchEnd,touchStart,touchMove}) => {
  return (
           <div className={styles.inputRange} onTouchEnd={touchEnd}>
              <input type="range"  min="0" max="100" />
            </div>
          )
  }

export default InputRange
import React from 'react'

import styles from  './inputRange.css'

const InputRange = ({change}) => {
  return (
           <div>
              <input type="range" name="volume" min="0" max="100" onTouchEnd={change} />
            </div>
          )
  }

export default InputRange
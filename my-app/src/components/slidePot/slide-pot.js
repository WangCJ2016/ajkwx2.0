import React from 'react'
import classNames from 'classnames'

import styles from  './slide-pot.css'
import { numToarray } from '../../utlis'

const SlidePot = ({num,activeIndex}) => {
  const arry = numToarray(num)
  return (
    <div className={styles.slide_box}>
      {arry.map((num,index) => {
        const classname = classNames({
          pot:true,
          pot_active:index === activeIndex
        })
                return(
                  <p className={styles.slide_pot} key={index}>
                    <span className={classname}></span>
                  </p>
                )
          })
      }
    </div>
  )
}

export default SlidePot
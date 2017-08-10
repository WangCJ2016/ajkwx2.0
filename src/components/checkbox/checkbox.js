import React from 'react'

import styles from './checkbox.css'

class Checkbox extends React.Component {
  render(){
    const { checked,onchange } = this.props

    return (
      <div className={styles.checkbox}>
        <input type="checkbox" id='rememberPassword' className={styles.checkbox_input} checked={checked} onChange={onchange}/>
        <label htmlFor="rememberPassword" className={styles.checkbox_label}></label>
      </div>
    )
  }
}

export default Checkbox
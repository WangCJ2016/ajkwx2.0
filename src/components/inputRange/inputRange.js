import React from 'react'

import styles from  './inputRange.css'

class InputRange extends React.PureComponent {
   constructor(){
    super()
    this.state = {
      value:50
    }
    this.change = this.change.bind(this)
   }
   change(e){
     console.log(e.target.value)
     this.setState({
     	 value:e.target.value
     })
   }
   render(){
     return (
           <div className={styles.inputRange} onTouchEnd={this.props.touchEnd}>
              <input type="range"  min="0" max="100" onChange={this.change} style={{'background':'linear-gradient(to right, #ffc356, white ' + this.state.value + '%, white)'}}/>
            </div>
          )
   }
}

export default InputRange
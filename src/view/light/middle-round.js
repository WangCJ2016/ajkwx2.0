import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'


import styles from './light.css'


@CSSModules(styles, { allowMultiple: true })
class MiddleRound extends React.PureComponent {
  constructor() {
    super()
    this. state={
    middle_round_rotate:0,
    middle_roundIndex:1
    }
  } 
  lightclassRender(){
    const classarray = ['卫生间','卧室','走廊','其他']
    return classarray.map((classs,index) => {
      const rotate =-index*25+30
      const middle_round_rotate=index*25-25
      const stylename =  classNames({
        class_title:true,
        class_title_active:index === this.state.middle_roundIndex
      }) 
      return (
      <p styleName={stylename} style={{transform:`rotateZ(${rotate}deg)`}} key={index} onClick={()=>this.setState({middle_round_rotate:middle_round_rotate,middle_roundIndex:index})}>
        {classs}
      </p>
      )
    })
  }
  render(){
    return(
      <div styleName="middle_round" style={{transform:`rotateZ(${this.state.middle_round_rotate}deg)`}}>
            {this.lightclassRender()}
      </div>
    )
  }
}

export default MiddleRound